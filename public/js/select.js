jQuery(document).ready(function($) {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  /**
  * Events
  */
  /* sockets */
  socket.on('connect', onSocketConnect);
  socket.on('error', onSocketError);

  /* dom */
//  $('#send').on('click', sendNewLine);

  init();

  /**
  * handlers
  */
  /* sockets */
  function onSocketConnect() {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
    socket.emit('newUser', {id: sessionId, name: app.session});
  };
  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  function init(){
    $('.thumbs img:first-child, .thumbslegends p:first-child').addClass('on');
  }

});