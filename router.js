var _ = require("underscore");
var url = require('url')
var fs = require('fs-extra');

module.exports = function(app,io,m){

  /**
  * routing event
  */

  app.get("/", getIndex);
  app.get("/select/:session", getSelect);
  app.get("/select/:session/capture", getCapture)
  // app.get("/print/:session/:recipeId/", getPrint);

  /**
  * routing functions
  */

  // GET
  function getIndex(req, res) {
    res.render("index", {title : "Opendoc"});
  };
  function getSelect(req, res) {
    var session = req.param('session');
    var sessionPath = 'sessions/'+session;

    fs.ensureDirSync(sessionPath);

    res.render("select", {
      title : "Selection de la recette",
      session : session,
    });
  };
  function getCapture(req, res) {
    var session = req.param('session');
    var recipeId = req.param('recipeId');

    res.render("capture", {
      title : "Prise de vue-Opendoc",
      session : session,
    });
  };


};