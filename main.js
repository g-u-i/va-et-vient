var fs = require('fs');

module.exports = function(app, io){
  console.log("main module initialized");

  var sessions_p = "sessions/"
  // var img_p = 'public/images/';
  
  var images = [];
  var checkImagesInterval;

  io.on("connection", function(socket){
    socket.on("newImage", onNewImage);
  });


  function init(){
    // images = readImages();
    // checkImagesInterval = setInterval(function(){
    //   checkImages();
    // }, 500);
  };

  this.getImages = function(session){return readImages(session);};
  function readImages(session){
    var imgs = [], list;
    var img_p = sessions_p+session+'/';
    var folders = fs.readdirSync(img_p);
    folders = folders.filter(function(f){ return !fs.statSync(img_p+f).isFile(); });
    // console.log('folders = ', folders);

    for(var i in folders){
      list = fs.readdirSync(img_p+folders[i]);
      // console.log('list', list);
      imgs.push({session_folder: session, folder:folders[i], files:list, length:list.length});
    }
    // console.log('images = ',imgs);
    return imgs;
  };

  this.getSessionsList = function(){ return getSessionsList();};
  function getSessionsList(){
    var folders = fs.readdirSync(sessions_p);
    folders = folders.filter(function(f){ return fs.statSync(sessions_p+f).isDirectory(); });
    return folders;
  };
  
  function onNewImage (req){

    console.log(req.path);

    req.imgBase64 = req.imgBase64.replace(/^data:image\/jpeg+;base64,/, "");
    req.imgBase64 = req.imgBase64.replace(/ /g, '+');

    var ts = Math.round((new Date()).getTime() / 1000);

    var path = "sessions/"+req.path+"/"+ts+".jpg";

    fs.writeFile(path, req.imgBase64, 'base64', function(err) {
        console.info("write new file to " + path, err);
    });
  };
  init();
};