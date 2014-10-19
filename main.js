var fs = require('fs-extra');
var glob = require("glob");
var path = require("path");
var gm = require('gm');
var markdown = require( "markdown" ).markdown;
var exec = require('child_process').exec;

module.exports = function(app, io){

	console.log("main module initialized");
	var sessions_p = "sessions/"

	io.on("connection", function(socket){
		socket.on("newLine", onNewLine);
		socket.on("newUser", onNewUser);
		socket.on("newRecipe", onNewRecipe)
	});

	function init(){};

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