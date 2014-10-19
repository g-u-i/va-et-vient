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

  function init(){
    onNewRecipe();
    getRecipe("A", 1);
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
    var session  ="A"
    var recipeId = glob(sessions_p+'/'+session+'/*.png', {nocase: true, sync: true}).length;

    exec('screencapture -x '+sessions_p+'/'+session+'/'+recipeId+'.png', function(error, stdout, stderr){ 
      console.log("capture");
      io.sockets.emit("newRecipeId", {recipeId: recipeId});
    });   
  }

  // helpers

  this.getRecipe = function(session, id){return getRecipe(session, id);};
  function getRecipe(session, id) {
    var patern = sessions_p+session+'/'+id;
    fs.existsSync(patern+'.png', function(hasimage) {
      if (hasimage) fs.existsSync(patern+'.json', function(hasjson) {
          if (hasjson) {
            var recipe = JSON.parse(fs.readFileSync(patern+'.json', 'utf8'));
          }
        });
    });
    console.log(patern);
    return "okkassss"+patern;
  }

  init();
};