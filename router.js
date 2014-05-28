var _ = require("underscore");
var url = require('url')
var fs = require('fs');
var json2csv = require('json2csv');

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
    res.render("redaction", {
      title : "Redaction",
      session : req.param('session'),
      images:m.getImages(req.param('session'))
    });
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

  function postNewLine(req, res) {
    // console.info('req.body', req.body);

    data = {images:{}};
    for(key in req.body){
      // console.log('key', key);
      if(match = key.match(/image-(\d+)/)){
        data.images[match[1]] = req.body[key];
      }else{
        data[key] = req.body[key];
      }
    }

    //The req body expects a param named "legend"
    // var legend = req.body.legend;

    //If the legend is empty or wasn't sent it's a bad req
    if(_.isUndefined(data.legend) || _.isEmpty(data.legend.trim())) {
      return res.json(400, {error: "Legend is invalid"});
    }

    // record line in csv
    json2csv({data:data ,fields:["legend","images"]}, function(err,csv){
      var records = fs.openSync('sessions/'+data.session+'/data.txt', 'a+');
      fs.writeSync(records, csv);
      fs.close(records);
    });

    data.session = req.body.session;
    // console.log('data', data);

    //Let our chatroom know there was a new message
    io.sockets.emit("incomingLine", data);

    //Looks good, let the client know
    res.json(200, {message: "New line received"});
  };

  function postNewSession(req, res){
    console.log('postNewSession');

    var newsesspath = 'sessions/'+req.body.name;
    // var fstat = fs.statSync(newsesspath);
    // if(!fstat.isDirectory()){
      fs.mkdir(newsesspath, function(){
        // create csv file for record
        // fs.
        // create sub folders for images
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
