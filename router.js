var _ = require("underscore");
var url = require('url')
var fs = require('fs');

module.exports = function(app,io,m){

  /**
  * routing event
  */

  app.get("/", getIndex);
  app.get("/select/:session", getSelect);


  //POST
  //app.post("/newSession", postNewSession);

  /**
  * routing functions
  */

  // GET
  function getIndex(req, res) {
    res.render("index", {title : "museo", sessions:m.getSessionsList()});
  };
  function getSelect(req, res) {
    var session = req.param('session');

    res.render("select", {
      title : "Selection de la recette",
      session : session,
    });
  };

  /* POST */

};
