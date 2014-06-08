var fs = require('fs');
var glob = require("glob");
var path = require("path");
var gm = require('gm');

module.exports = function(app, io){
  console.log("main module initialized");

  var sessions_p = "sessions/"
  // var img_p = 'public/images/';
  
  var images = [];
  var checkImagesInterval;

  io.on("connection", function(socket){
    socket.on("capture", onCapture);
    socket.on("newNote", onNewNote);
  });

  function init(){
    // images = readImages();
    // checkImagesInterval = setInterval(function(){
    //   checkImages();
    // }, 500);
  };

  this.getImages = function(session){return readImages(session);};
  function readImages(session){
    var imgs = [];
    var img_p = sessions_p+session+'/';
    var folders = fs.readdirSync(img_p);

    glob('sessions/'+session+'/*/', {nocase: true, sync: true}, function (er, folders) {
      folders.forEach(function(folder) {

        glob(folder+'*.jpg', {nocase: true, sync: true}, function (er, files) {
          var list = [];
          files.forEach(function(file){
            list.push(path.basename(file));
          });

          imgs.push({
            sessionName: session, 
            columnName: path.basename(folder), 
            files:list,
            length:list.length
          });
        });
      });
    });
    return imgs;
  };


  this.getSessionsList = function(){ return getSessionsList();};
  function getSessionsList(){
    var folders = fs.readdirSync(sessions_p);
    folders = folders.filter(function(f){ return fs.statSync(sessions_p+f).isDirectory(); });
    return folders;
  };
  
  function onCapture (req){

    req.imgBase64 = req.imgBase64.replace(/^data:image\/jpeg+;base64,/, "");
    req.imgBase64 = req.imgBase64.replace(/ /g, '+');

    var ts = Math.round((new Date()).getTime() / 1000);

    var path = '/'+req.session+'/'+req.column+'/'+req.note.time+'_'+ts;

    fs.writeFile('sessions'+path+'.raw.jpg', req.imgBase64, 'base64', function(err) {
      console.info("new capture " + path, err);
      gm('sessions'+path+'.raw.jpg')
        .autoOrient()
        .monochrome()
        .resize(300)
        .write('sessions'+path+'.jpg', function (err) {
        if (!err){
          io.sockets.emit("newImage", {
            session:req.session,
            column:req.column,
            ts:ts,
            src:'/'+req.session+'/'+req.column+'/'+req.note.time+'_'+ts+'.jpg',
            note: req.note
          });
        };
      });
    });
  };
  function onNewNote (req){
    console.log("new note", req);

    var path = '/'+req.session+'/'+req.column+'/'+req.time+'.md';

    fs.writeFile('sessions'+path, req.text, function(err) {
      io.sockets.emit("newNote", {
        text : req.text,
        column : req.column,
        time : req.time,
        path : path
      }); 
      console.log(err);
    }); 
  }
  init();
};