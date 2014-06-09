function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  $('.sendNote').on('click', sendNewNote);
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
    console.log("article#t"+data.note.time+' .col-xs-9');
    $newimage.appendTo("article#t"+data.note.time+" .col-xs-9");
  };
  function sendNewNote(e){
    // console.log(e);
    var data =  {
      session : app.session,
      text : $("#note").val(),
      column : $(this).val(),
      time : new Date().getTime()
    }
    socket.emit("newNote",data);
    addNewNote(data);
    $("#note").val('');
  };
  function addNewNote(data){
    var $newline = $('<article>')
        .addClass('record row')
        .attr('id', 't'+data.time)
        .append($('<div>')
          .addClass('col-xs-3')
          .append($('<p>')
            .addClass('modeleur col-xs-2')
            .html(data.column)
          )
          .append($('<p>')
            .addClass('legend col-xs-10')
            .html(data.text)
          )
        )
        .append($('<div>')
          .addClass('col-xs-9')
        );
    $newline.appendTo('#content');
  };
};
$(document).on('ready', init);