var _ = require("underscore");
var url = require('url')
var fs = require('fs');

module.exports = function(app,io,m){

  /**
  * routing
  */
  //Handle route "GET /", as in "http://localhost:8080/"
  app.get("/", getIndex);
  app.get("/editor", getEditor);
  app.get("/capture", getCapture);
  app.get("/redaction/:session", getRedaction);
  app.get("/visualisation", getVisualisation);
  app.get("/admin", getAdmin);

  //POST method to create a newline
  app.post("/newline", postNewLine);
  app.post("/newImage", postNewImage);
  app.post("/newSession", postNewSession);

  /**
  * routing functions
  */
  /* GET */
  function getIndex(request, response) {
    response.render("index", {title : "museo", sessions:m.getSessionsList()});
  };

  function getEditor(request, response) {
    response.render("editor", {pageData: {title : "Editor"}});
  };

  function getCapture(request, response) {
    response.render("capture", {pageData: {title : "Snapshot"}});
  };

  function getRedaction(req, res) {
    // console.log('session = '+req.param('session'));
    res.render("redaction", {pageData:{
      title : req.param('session') + " | Redaction",
      images:m.getImages(req.param('session'))
    }});
  };

  function getVisualisation(request, response) {
    response.render("visualisation", {pageData: {title : "Feedback"}});
  };

  function getAdmin(request, response) {
    response.render("admin", {pageData: {title : "Admin"}});
  };

  /* POST */
  function postNewImage(req, response){

      var path = req.body.path;

      req.body.imgBase64 = req.body.imgBase64.replace(/^data:image\/jpeg+;base64,/, "");
      req.body.imgBase64 = req.body.imgBase64.replace(/ /g, '+');

      var ts = Math.round((new Date()).getTime() / 1000);
      var path = "public/images/"+path+"/"+ts+".jpg";

      fs.writeFile(path, req.body.imgBase64, 'base64', function(err) {
          console.info("write new file to " + path);
      });

      response.json(200, {message: "New picture received"});
  };

  function postNewLine(request, response) {
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
  };

  function postNewSession(req, res){
    console.log('setNewSession');
    var newsesspath = 'sessions/'+req.body.name;
    // var fstat = fs.statSync(newsesspath);
    // if(!fstat.isDirectory()){
      fs.mkdir(newsesspath, function(){
        for (var i = 3; i > 0; i--) {
          fs.mkdir(newsesspath+'/0'+i);
        };
      });

      res.json(200, {message: "New Session created"});
    // }else{
    //   response.json(200, {message: "Session already exists"});
    // }
  };

  // helpers
  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  };
};
