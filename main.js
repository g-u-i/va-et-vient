var fs = require('fs');

module.exports = function(app, io){
  console.log("main module initialized");

  var img_p = 'public/images/';
  var images;
  var checkImagesInterval;

  function init(){
    images = readImages();
    checkImagesInterval = setInterval(function(){
      checkImages();
    }, 500);
  };

  this.getImages = function(){
    if(!images.lenght){
      readImages();
    }
    return images;
  };

  function readImages(){
    var imgs = [], list;
    var folders = fs.readdirSync(img_p);
    folders = folders.filter(function(f){ return !fs.statSync(img_p+f).isFile(); });

    for(var i in folders){
      list = fs.readdirSync(img_p+folders[i]);
      imgs.push({folder:folders[i], files:list, length:list.length});
    }
    // console.log('images = ',images);
    return imgs;
  };

  function checkImages(){
    var imgs = readImages();
    var inarray;

    for(var f in imgs){
      for(var i in imgs[f].files){
        inarray = false;
        for(ii in images[f].files){
          if(images[f].files[ii] == imgs[f].files[i]){
            inarray = true;
            break;
          }
        }
        if(!inarray){
          // console.log('new images :: ',imgs[f].files[i]);
          io.sockets.emit("newImage", {
            folder:imgs[f].folder,
            img:imgs[f].files[i],
            src:'/images/'+imgs[f].folder+'/'+imgs[f].files[i],
            // index:i
          });
        }
      }
    }

    images = imgs;
  };

  /**
  * Socket.IO events
  */
  io.on("connection", function(socket){

    /*
      When a new user connects to our server, we expect an event called "newUser"
      and then we'll emit an event called "newConnection" with a list of all
      participants to all connected clients
    */
    socket.on("newUser", function(data) {
      // participants.push({id: data.id, name: data.name});
      // io.sockets.emit("newConnection", {participants: participants});
    });

    /*
      When a user changes his name, we are expecting an event called "nameChange"
      and then we'll emit an event called "nameChanged" to all participants with
      the id and new name of the user who emitted the original message
    */
    socket.on("nameChange", function(data) {
      // _.findWhere(participants, {id: socket.id}).name = data.name;
      // io.sockets.emit("nameChanged", {id: data.id, name: data.name});
    });

    /*
      When a client disconnects from the server, the event "disconnect" is automatically
      captured by the server. It will then emit an event called "userDisconnected" to
      all participants with the id of the client that disconnected
    */
    socket.on("disconnect", function() {
      // participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
      // io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
    });
  });

  init();
};
