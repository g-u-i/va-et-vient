var fs = require('fs-extra'),
		glob = require("glob"),
		path = require("path"),
		gm = require('gm'),
		markdown = require( "markdown" ).markdown,
		exec = require('child_process').exec,
		phantom = require('phantom');

//option impression
var Printer = require('zuzel-printer');
var options = {
		  'fitplot': true,
		};


// Create a new Pinter from available devices
var printer = new Printer('HP_Officejet_7500_E910');

module.exports = function(app, io){

	console.log("main module initialized");
	var sessions_p = "sessions/";

	io.on("connection", function(socket){
		socket.on("newLine", onNewLine);
		socket.on("newUser", onNewUser);
		socket.on("newRecipe", onNewRecipe)
	});

	function init(){

	};

	// events

	function onNewUser(req){
		console.log(req);
	};
	function onNewLine(req){
		console.log(req);

		var path = '/'+req.session+'/data.json';
		var lines = getRecordedSessionLines(req.session);

		lines.push(req);

		recordSessionLines(req.session, lines);
		io.sockets.emit("incomingLine", req);
	};

	function onNewRecipe(req){

		console.log(req);
		var recipe   = req.recipe,
				session  = recipe.session,
				recipeId = glob(sessions_p+'/'+session+'/*.png', {nocase: true, sync: true}).length,
				path = sessions_p+session+'/'+recipeId;

		// update recipe ID 
		recipe.id = recipeId;
		recipe.humanTime = timestampToTimer(recipe.time);

		//exec('import '+path+'.png',function(error, stdout, stderr){ //pour Linux KDE
		exec('screencapture -x '+path+'.png',function(error, stdout, stderr){ //Pour OSX
			fs.writeFile(path+'.json', JSON.stringify(recipe), function(err) {
				io.sockets.emit("newRecipeId", {recipe: recipe});
				console.log('new recipe recorded', recipeId);
				renderRecipe(session, recipeId);
			});
		});
	};
 	//

 	function renderRecipe(session, recipeId){

 		var url = 'http://localhost:1337/print/'+session+'/'+recipeId+'/',
 				pdf = sessions_p+'/'+session+'/'+recipeId+'.pdf';
	 	phantom.create(function(ph){
		  ph.createPage(function(page) {
		  	//page.set('viewportSize', { width : "2970", height : "21cm"});
 				page.set("paperSize", { format: "A4", orientation: 'portrait', margin: '0cm' });
 		    page.open(url, function(status) {
		      page.render(pdf, function(){
		        console.log('Page Rendered',url);
						fs.copy(pdf, 'printbox/'+session+'_'+recipeId+'.pdf', function(err){
							console.log(err);
							//CODE FOR PRINTING WITH NODE MODULE
							var filePath = 'printbox/'+session+'_'+recipeId+'.pdf';
							var jobFromFile = printer.printFile(filePath);
							jobFromFile.once('sent', function() {
						    jobFromFile.on('completed', function() {
						        console.log('Job ' + jobFromFile.identifier + 'has been printed');
						        jobFromFile.removeAllListeners();
						        //Move the file from printbox to archivebox when finishing
						        fs.rename(filePath, 'archivebox/'+session+'_'+recipeId+'.pdf', function (err) {
										  if (err) {
										    throw err;
										  }
										  console.log('Moved '+filePath+' to archivebox/'+session+'_'+recipeId+'.pdf');
										});
						    });
							});
							//FIN DU CODE POUR IMPRIMER
		        ph.exit();
		      });
		    });
		  });
		});
});
 	};

	this.getRecipe = function(session, recipeId){return getRecipe(session, recipeId);};
	function getRecipe(session, recipeId) {

		var path = sessions_p+session+'/'+recipeId;
		var recipe = JSON.parse(fs.readFileSync(path+'.json', 'utf8'));
		
		console.log(recipe, path);
		return recipe;
	}

  // helpers
  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  function timestampToTimer(time){

      var d = new Date(time);
      return pad(d.getHours()   ,2) + ':' + 
             pad(d.getMinutes() ,2) + ':' + 
             pad(d.getSeconds()   ,2);
  }
	init();
};