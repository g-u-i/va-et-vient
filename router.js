var _ = require("underscore");
var url = require('url')
var fs = require('fs');

module.exports = function(app,io,m){

  /**
  * routing event
  */

  app.get("/", getIndex);
  app.get("/editor/:session", getEditor);
  app.get("/capture/:session", getCapture);
  app.get("/redaction/:session", getRedaction);
  app.get("/visualisation/:session", getVisualisation);
  app.get("/admin", getAdmin);

  //POST
  app.post("/newline", postNewLine);
  app.post("/newImage", postNewImage);
  app.post("/newSession", postNewSession);

  /**
  * routing functions
  */

  // GET 
  function getIndex(req, res) {
    res.render("index", {title : "museo", sessions:m.getSessionsList()});
  };

  function getEditor(req, res) {
    var session = request.param('session');
    response.render("editor", {
      title : "Editor",
      session : session,
    });
  };
  function getCapture(req, res) {

    var session = req.param('session');

    res.render("capture", {
      title : "Snapshot",
      session : session
    });
  function getRedaction(req, res) {
    // console.log('session = '+req.param('session'));
    var session = req.param('session');
    var lines = getRecordedSessionLines(session);

    res.render("redaction", {
      title : "Redaction",
      session : session,
      lines: lines,
      images:m.getImages(req.param('session'))
    });
  };

  function getVisualisation(req, res) {
    var session = req.param('session');
    var lines = getRecordedSessionLines(session);

    res.render("visualisation", {
      title : "Feedback",
      session : session,
      lines: lines
    });
  };

  function getAdmin(req, res) {
    res.render("admin", {pageData: {title : "Admin"}});
  };

  /* POST */
  function postNewImage(req, res){
    var path = req.body.path;

    req.body.imgBase64 = req.body.imgBase64.replace(/^data:image\/jpeg+;base64,/, "");
    req.body.imgBase64 = req.body.imgBase64.replace(/ /g, '+');

    var ts = Math.round((new Date()).getTime() / 1000);
    var path = "public/images/"+path+"/"+ts+".jpg";

    fs.writeFile(path, req.body.imgBase64, 'base64', function(err) {
        console.info("write new file to " + path);
    });

    res.json(200, {message: "New picture received"});
  };

  function postNewLine(req, res) {
    // console.info('req.body', req.body);
    var session = req.body.session;
    var newline = {images:{}};
    for(key in req.body){
      // console.log('key', key);
      if(match = key.match(/image-(\d+)/)){
        newline.images[match[1]] = req.body[key];
      }else{
        newline[key] = req.body[key];
      }
    }

    //The req body expects a param named "legend"
    // var legend = req.body.legend;

    //If the legend is empty or wasn't sent it's a bad req
    if(_.isUndefined(newline.legend) || _.isEmpty(newline.legend.trim())) {
      return res.json(400, {error: "Legend is invalid"});
    }

    // console.log('newline', newline);

    // stroe data as json on a file data.json
    var stored = getRecordedSessionLines(session);
    stored.push(newline);
    recordeSessionLines(session, stored);

    // Let know there was a new line
    io.sockets.emit("incomingLine", newline);

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
        var data_fd = fs.openSync(newsesspath+'/data.json', 'w+');
        fs.writeSync(data_fd, JSON.stringify([]));
        fs.close(data_fd);

        // create sub folders for images
        for (var i = 3; i > 0; i--) {
          fs.mkdir(newsesspath+'/0'+i);
        };
      });

      res.json(200, {message: "New Session created"});
    // }else{
    //   res.json(200, {message: "Session already exists"});
    // }
  };

  /**
  * helpers
  */
  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      res = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    res.type = matches[1];
    res.data = new Buffer(matches[2], 'base64');

    return res;
  };

  function getRecordedSessionLines(session){
    var data_file_path = 'sessions/'+session+'/data.json';
    var stored_json = fs.readFileSync(data_file_path, 'utf8');
    return JSON.parse(stored_json);
  };

  function recordeSessionLines(session, obj){
    var data_file_path = 'sessions/'+session+'/data.json';
    fs.writeFileSync(data_file_path, JSON.stringify(obj), encoding='utf8');
  };

};
