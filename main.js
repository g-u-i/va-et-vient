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
    socket.on("newLine", onNewLine);
    socket.on("updateNote", onUpdateNote);
  });

  function init(){
    // images = readImages();
    // checkImagesInterval = setInterval(function(){
    //   checkImages();
    // }, 500);
  };

  // events
  function onCapture (req){

    req.imgBase64 = req.imgBase64.replace(/^data:image\/jpeg+;base64,/, "");
    req.imgBase64 = req.imgBase64.replace(/ /g, '+');

    var ts = Math.round((new Date()).getTime() / 1000);

    var path = '/'+req.session+'/'+req.column+'/'+req.note.time+'_'+ts;

    fs.writeFile('sessions'+path+'.raw.jpeg', req.imgBase64, 'base64', function(err) {
      console.info("new capture " + path, err);


      var cp_height = 1620, cp_width = 1080, cp_x = (1920-cp_height)/2, cp_y = 0;

      gm('sessions'+path+'.raw.jpeg')
        .autoOrient()
        //.monochrome()
        .crop(cp_height, cp_width, cp_x, cp_y)
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

    var path = '/'+req.session+'/'+req.column+'/'+req.time+'.json';
    var data = {
        session : req.session,
        column : req.column,
        time : req.time,
        text : req.text,
        done : false
    };

    fs.writeFile('sessions'+path, JSON.stringify(data), function(err) {
      io.sockets.emit("newNote", data);
    });
  };
  function onNewLine(req){
    console.log(req);

    var path = '/'+req.session+'/data.json';
    var lines = getRecordedSessionLines(req.session);

    lines.push(req);

    recordSessionLines(req.session, lines);
    io.sockets.emit("incomingLine", req);
  };
  function onUpdateNote(req){
    console.log(req);
    var path = '/'+req.session+'/'+req.column+'/'+req.time+'.json';

    fs.writeFile('sessions'+path, JSON.stringify(req));
  };

  // reload from files

  this.getImages = function(session){return readImages(session);};
  function readImages(session){
    var imgs = [];
    var img_p = sessions_p+session+'/';

    glob('sessions/'+session+'/*/', {nocase: true, sync: true}, function (er, folders) {
      folders.forEach(function(folder) {

        glob(folder+'*.jpg', {nocase: true, sync: true}, function (er, files) {
          var list = [];
          files.forEach(function(file){
            var basename = path.basename(file);
            var noteId = basename.split("_")[0]+'.json';

            var note = JSON.parse(fs.readFileSync(folder+noteId, 'utf8'));
            
            var file = {
              name : basename,
              alt : note.text
            };

            list.push(file);  
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

  this.getNotesList = function(session){ return getNotesList(session);};
  function getNotesList(session){
    console.log('sessions/'+session+'/*/*.json');

    var notes = [];

    glob('sessions/'+session+'/*/*.json', {nocase: true, sync: true}, function(er, notesFiles){
      notesFiles.forEach(function(notePath){            
        var noteId = path.basename(notePath, ".json");
        var columnName = path.basename(path.dirname(notePath));

        var note = JSON.parse(fs.readFileSync(notePath, 'utf8'));
            note.images = [];

        glob('sessions/'+session+'/'+columnName+'/'+noteId+'_*.jpg', {nocase: true, sync: true}, function(er, images){
          console.log("im",images);
          note.images.push(images);
        });
        notes.push(note);
      });
    });
    console.log("note",notes);
    return notes;
  };

  this.getRecordedSessionLines = function(session){ return getRecordedSessionLines(session);};
  function getRecordedSessionLines(session){
    var data_file_path = 'sessions/'+session+'/data.json';
    var stored_json = fs.readFileSync(data_file_path, 'utf8');
    return JSON.parse(stored_json);
  };

  // helpers

  function recordSessionLines(session, obj){
    var data_file_path = 'sessions/'+session+'/data.json';
    fs.writeFileSync(data_file_path, JSON.stringify(obj), encoding='utf8');
  };

  init();
};