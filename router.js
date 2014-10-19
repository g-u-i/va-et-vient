var _ = require("underscore");
var url = require('url')
var fs = require('fs-extra');

module.exports = function(app,io,m){

  /**
  * routing event
  */

  app.get("/", getIndex);
  app.get("/select/:session", getSelect);
  app.get("/print/:session/:recipeId/", getPrint);

  /**
  * routing functions
  */

  // GET
  function getIndex(req, res) {
    res.render("index", {title : "museo", sessions:m.getSessionsList()});
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
  function getPrint(req, res) {
    var session = req.param('session');
    var recipeId = req.param('recipeId');

    res.render("print", {
      title : "",
      session : session,
      recipeId : recipeId,
      recipe : m.getRecipe(session, recipeId),
    });
  };

  /* UTILS */


};