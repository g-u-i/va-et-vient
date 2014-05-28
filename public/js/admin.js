function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  /**
  * Events
  */
  /* sockets */
  socket.on('connect', onSocketConnect);
  // socket.on('incomingLine', onIncomingLine);
  socket.on('error', onSocketError);

  /* dom */
  $('button.create-session').on('click', sendNewSession);

  /**
  * handlers
  */
  /* sockets */
  function onSocketConnect() {
    sessionId = socket.socket.sessionid;
    console.log('Connected ' + sessionId);
    // socket.emit('newUser', {id: sessionId, name: $('#name').val()});
  };

  // function onIncomingLine(data) {
  //   console.log('incomingLine', data);

  // };

  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  /* dom */
  function sendNewSession(){
    // socket.emit('newsession', {name: $('.session-name').val(), number: $('.capture-lenght').val()});

    var data = {};
    data.name = $('.session-name').val();
    data.number = $('.capture-lenght').val();
    console.log("data", data);
    $.ajax({
      url:  '/newSession',
      type: 'POST',
      dataType: 'json',
      data: data
    }, function(data){
      console.log('response', data);
    });

  };


  /**
  * helpers
  */
};

$(document).on('ready', init);