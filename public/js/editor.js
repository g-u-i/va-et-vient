function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  $('#sendNote').on('click', sendNewNote);

  function sendNewNote(e){
    socket.emit("newNote",
    {
      session : app.session,
      text : $("#note").val(),
      column : $("#column").val(),
      time : Math.round((new Date()).getTime() / 1000)
    });
  }
};
$(document).on('ready', init);