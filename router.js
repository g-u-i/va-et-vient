var _ = require("underscore");

module.exports = function(app,io,m){

  /**
  * routing
  */
  //Handle route "GET /", as in "http://localhost:8080/"
  app.get("/", getIndex);

  //POST method to create a newline
  app.post("/newline", postNewLine);

  /**
  * routing functions
  */
  function getIndex(request, response) {
    //Render the view called "index"
    response.render("index", {pageData: {title : "museo", images:m.getImages()}});
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
};
