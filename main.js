var fs = require('fs-extra'),
		glob = require("glob"),
		path = require("path"),
		gm = require('gm'),
		markdown = require( "markdown" ).markdown,
		exec = require('child_process').exec,
		phantom = require('phantom');

module.exports = function(app, io){

	console.log("main module initialized");
	var sessions_p = "sessions/"

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
		var session  ="A",
				recipeId = glob(sessions_p+'/'+session+'/*.png', {nocase: true, sync: true}).length,
				path = sessions_p+session+'/'+recipeId;

		exec('screencapture -x '+path+'.png',function(error, stdout, stderr){
			fs.writeFile(path+'.json', JSON.stringify(req), function(err) {
				io.sockets.emit("newRecipeId", {recipeId: recipeId});
			});
		});
	};
 	//

 	function renderRecipe(session, recipeId){

 		var url = "http://localhost:8080/print/"+session+'/'+recipeId;

	 	phantom.create(function(ph){
		  ph.createPage(function(page) {
		    page.open(url, function(status) {
		      page.render('/exports/'+session+'_'+recipeId+'.pdf', function(){
		        console.log('Page Rendered',url);
		        ph.exit();
		      });
		    });
		  });
		});
 	}

	this.getRecipe = function(session, recipeId){return getRecipe(session, recipeId);};
	function getRecipe(session, recipeId) {

		var path = sessions_p+session+'/'+recipeId;

		fs.existsSync(path+'.png', function(hasimage) {
			if (hasimage) fs.existsSync(path+'.json', function(hasjson) {
				if (hasjson) {
					var recipe = JSON.parse(fs.readFileSync(path+'.json', 'utf8'));
				}
			});
		});
		console.log(path);
		return "okkassss"+path;
	}
	init();
};