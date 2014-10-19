var fs = require('fs-extra');
var glob = require("glob");
var path = require("path");
var gm = require('gm');
var markdown = require( "markdown" ).markdown;

module.exports = function(app, io){
  console.log("main module initialized");

  var sessions_p = "sessions/"
  var export_p = "exports/"
  // var img_p = 'public/images/';
  
  var images = [];
  var checkImagesInterval;

  io.on("connection", function(socket){

    socket.on("newLine", onNewLine);
    socket.on("newUser", onNewUser);


  });

  function init(){
    // exportToArticle("expenmuseo-edited");
  };

  // events

  function onNewUser(req){-
    console.log(req);
  }
  function onNewLine(req){
    console.log(req);

    var path = '/'+req.session+'/data.json';
    var lines = getRecordedSessionLines(req.session);

    lines.push(req);

    recordSessionLines(req.session, lines);
    io.sockets.emit("incomingLine", req);
  };

  // reload from files



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
  function recordSessionLines(session, obj){
    var data_file_path = 'sessions/'+session+'/data.json';
    fs.writeFileSync(data_file_path, JSON.stringify(obj), encoding='utf8');
  };

  function exportToArticle(session){
    console.log('exporting',session);

    var textFile = export_p+session+'/text.html';
    var text     = '<!DOCTYPE html><meta charset="utf-8">';
    var lineNum  = 0;

    for (var i = 3; i > 0; i--) {
      var columnFolder = path.dirname(textFile)+'/0'+i;
      if (! fs.existsSync(columnFolder)) fs.mkdir(columnFolder);
    };

    getRecordedSessionLines(session).forEach(function(l){
      lineNum++;
      text += markdown.toHTML(l.caption);
      text += markdown.toHTML("[--]" + timestampToTimer(l.time) + "[--]");

      for(var key in l.images){
        var img = l.images[key];
        var imgPath  = __dirname+'/'+sessions_p+session+'/'+key+'/'+path.basename(l.images[key], ".jpg")+'.raw.jpeg';
        var linkPath = __dirname+'/'+export_p+session+'/'+key+'/'+pad(lineNum,4)+"_"+l.images[key]+'.jpg';
        var whitePath = __dirname+'/'+sessions_p+'/white.jpg';

        if(!img) imgPath = whitePath;
        fs.copySync(imgPath, linkPath);
      }
    });

    fs.mkdir(path.dirname(textFile), function(){
      fs.writeFileSync(textFile, text, encoding='utf8');
    });


  };
  init();
};