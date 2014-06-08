function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  $('#sendNote').on('click', sendNewNote);

  socket.on('newImage', onNewImage);


  function onNewImage(data) {
    console.log('new image :: data', data);
    var $newimage = $("<div>")
      .addClass("col-xs-2")
      .append($('<img>')
        .addClass('thumb')
        .attr('alt', data.note.text)
        .attr('src', data.src)
      );

    console.log($newimage);
    console.log("article#"+data.note.time);
    $newimage.appendTo("article#t"+data.note.time);
  };

  function sendNewNote(e){
    var data =  {
      session : app.session,
      text : $("#note").val(),
      column : $("#column").val(),
      time : new Date()).getTime()
    }
    socket.emit("newNote",data);
    addNewNote(data);
  };
  function addNewNote(data){

    var $newline = $('<article>')
        .addClass('record row lead')
        .attr('id', 't'+data.time)
        .append($('<p>')
          .addClass('legend col-xs-3')
          .html(data.text));
    $newline.appendTo('#content');
  };
};
$(document).on('ready', init);