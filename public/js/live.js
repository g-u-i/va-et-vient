jQuery(document).ready(function($) {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  /**
  * Events
  */
  /* sockets */
  socket.on('newImage', onNewImage);


  function onNewImage(data) {
  console.log('new image :: data', data);

  var $newimage = $("<div>")
    .addClass("col-xs-12")
    .append($('<img>')
      .attr('alt', data.note.text)
      .attr('src', data.src)
      .attr('width',"100%")
    )
    .append($('<h1>')
      .html(data.note.text)
      .attr('width',"100%")

    );

  console.log($newimage);

  if(data.session == app.session){
    ("#content").html("");
    $newimage.prependTo("#content");
  } 
};
});