var fs = require('fs-extra');
var glob = require("glob");
var path = require("path");
var gm = require('gm');
var markdown = require( "markdown" ).markdown;
var exec = require('child_process').exec;

module.exports = function(app, io){
  console.log("main module initialized");

  var sessions_p = "sessions/"
  var export_p = "exports/"
  // var img_p = 'public/images/';
  
  var images = [];
  var checkImagesInterval;

  var spawn = require('child_process').spawn;

  io.on("connection", function(socket){

    socket.on("newLine", onNewLine);
    socket.on("newUser", onNewUser);
    socket.on("newRecipe", onNewRecipe)

  });

  function init(){
    onNewRecipe();
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
  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  function execute(command, callback){ exec(command, function(error, stdout, stderr){ callback(stdout); });};
  function timestampToTimer(time){

      var d = new Date(time);
      return pad(d.getHours()   ,2) + ':' + 
             pad(d.getMinutes() ,2) + ':' + 
             pad(d.getSeconds()   ,2);
  }

  init();
};