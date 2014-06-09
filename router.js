var _ = require("underscore");
var url = require('url')
var fs = require('fs');

module.exports = function(app,io,m){

  /**
  * routing event
  */

  app.get("/", getIndex);
  app.get("/editor/:session", getEditor);
  app.get("/capture/:session/:column", getCapture);
  app.get("/redaction/:session", getRedaction);
  app.get("/feedback/:session", getFeedback);
  app.get("/admin", getAdmin);

  //POST
  app.post("/newSession", postNewSession);

  /**
  * routing functions
  */

  // GET
  function getIndex(req, res) {
    res.render("index", {title : "museo", sessions:m.getSessionsList()});
  };
  function getEditor(req, res) {
    var session = req.param('session');
    res.render("editor", {
      title : "Prise de notes",
      session : session,
      notes: m.getNotesList(session),
      images:m.getImages(session)
    });
  };
  function getCapture(req, res) {

    var session = req.param('session');
    var column = req.param('column');


    res.render("capture", {
      title : "Modelage / prise de vue",
      session : session,
      column : column,
      notes: m.getNotesList(session)
    });
  };
  function getRedaction(req, res) {
    var session = req.param('session');

    res.render("redaction", {
      title : "Éditeur",
      session : session,
      lines: m.getRecordedSessionLines(session),
      images:m.getImages(session)
    });
  };
  function getFeedback(req, res) {
    var session = req.param('session');

    res.render("feedback", {
      title : "Lecture",
      session : session,
      lines: m.getRecordedSessionLines(session),
      images:m.getImages(session)
    });
  };
  function getAdmin(req, res) {
    res.render("admin", {pageData: {title : "Admin"}});
  };

  /* POST */

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
};
