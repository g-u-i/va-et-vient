/*
  Module dependencies:

  - Express
  - Http (to run Express)
  - Underscore (because it's cool)
  - Socket.IO(Note: we need a web server to attach Socket.IO to)

  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
  The only exception is Underscore, where we use, conveniently, an underscore. Oh, and "socket.io" is simply called io. Seriously, the
  rest should be named after its module name.
*/

var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , io = require("socket.io").listen(http)
  , _ = require("underscore")
  , fs = require('fs')
  // , readDir = require('readdir');


/*
  The list of participants in our chatroom.
  The format of each participant will be:
  {
    id: "sessionId",
    name: "participantName"
  }
*/
var participants = []

/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", 8080);

//Specify the views folder
app.set("views", __dirname + "/views");

//View engine is Jade
app.set("view engine", "jade");

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

//Tells server to support JSON, urlencoded, and multipart requests
app.use(express.bodyParser());

/* Server routing */

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

/* Socket.IO events */
io.on("connection", function(socket){

  /*
    When a new user connects to our server, we expect an event called "newUser"
    and then we'll emit an event called "newConnection" with a list of all
    participants to all connected clients
  */
  socket.on("newUser", function(data) {
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants});
  });

  /*
    When a user changes his name, we are expecting an event called "nameChange"
    and then we'll emit an event called "nameChanged" to all participants with
    the id and new name of the user who emitted the original message
  */
  socket.on("nameChange", function(data) {
    _.findWhere(participants, {id: socket.id}).name = data.name;
    io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  });

  /*
    When a client disconnects from the server, the event "disconnect" is automatically
    captured by the server. It will then emit an event called "userDisconnected" to
    all participants with the id of the client that disconnected
  */
  socket.on("disconnect", function() {
    participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
  });
});

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});


function getImages(){
  var images = [], list;
  var folders = fs.readdirSync('public/images/');
  for(var i in folders){
    list = fs.readdirSync('public/images/'+folders[i]);
    images.push({folder:folders[i], files:list});
  }
  // console.log('images = ',images);
  return images;
}