jQuery(document).ready(function($) {

  var serverBaseUrl = document.domain;
  var socket = io.connect();
  var sessionId = '';

  /**
  * Events
  */

  /* sockets */
  socket.on('connect', onSocketConnect);
  socket.on('error', onSocketError);

  init();

  function onSocketConnect() {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
    socket.emit('newUser', {id: sessionId, name: app.session});
  };
  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };
  function init(){
  }
});