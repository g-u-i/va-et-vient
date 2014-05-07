/*
  Module dependencies:
*/

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var _ = require("underscore");
var fs = require('fs');
// var readDir = require('readdir');

var config = require('./config');

/*
* Server config
*/
config(app, express);

/**
* Server routing
*/

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {

  //Render the view called "index"
  response.render("index", {pageData: {title : "museo", images:getImages()}});
});

//POST method to create a newline
app.post("/newline", function(request, response) {
  // console.info('request.body', request.body);

  data = {images:{}};
  for(key in request.body){
    // console.log('key', key);
    if(match = key.match(/image-(\d+)/)){
      data.images[match[1]] = request.body[key];
    }else{
      data[key] = request.body[key];
    }
  }
  console.log('data', data);

  //The request body expects a param named "legend"
  // var legend = request.body.legend;

  //If the legend is empty or wasn't sent it's a bad request
  if(_.isUndefined(data.legend) || _.isEmpty(data.legend.trim())) {
    return response.json(400, {error: "Legend is invalid"});
  }

  //Let our chatroom know there was a new message
  io.sockets.emit("incomingLine", data);

  //Looks good, let the client know
  response.json(200, {message: "New line received"});
});

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

/**
* helpers
*/

function getImages(){
  var images = [], list;
  var folders = fs.readdirSync('public/images/');
  for(var i in folders){
    list = fs.readdirSync('public/images/'+folders[i]);
    images.push({folder:folders[i], files:list});
  }
  // console.log('images = ',images);
  return images;
};


/**
* Start the http server at port and IP defined before
*/

http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
