function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  /**
  * Events
  */
  /* sockets */
  socket.on('connect', onSocketConnect);
  socket.on('incomingLine', onIncomingLine);
  socket.on('error', onSocketError);

  /* DOM */
  $(document).on('keypress', keyListenner);

  /**
  * handlers
  */
  /* sockets */
  function onSocketConnect() {
    sessionId = socket.socket.sessionid;
    console.log('Connected ' + sessionId);
    // socket.emit('newUser', {id: sessionId, name: $('#name').val()});
  };

  function onIncomingLine(data) {
    console.log('incomingLine', data);
    addNewLine(data);
  };

  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  /* DOM */
  function keyListenner(event) {

    var code = event.charCode || event.keyCode;

    switch ( code ) {
      case 37: // Key left
      case 38: // Key up
      case 39: // Key right
      case 40: // Key down
        selectGridCell(event);
        return;
        break;
    }

    switch ( String.fromCharCode(event.which) ) {
      case " ":
        manifyGridCell(event);
        break;
    }

  }


  /**
  * helpers
  */
  function addNewLine(data){
    var $newline = $('<article>').addClass('record row lead')
        .append($('<div>').addClass('column col-xs-3').append($('<p>').addClass('legend').html(data.legend)));

    for(folder in data.images){
      var src = '/images/'+folder+'/'+data.images[folder];
      $newline.append($('<div>').addClass('column col-xs-3').append($('<img>').addClass('thumb').attr('src', src)));
    }

    $newline.appendTo('#recordedlines');
  };


  function selectGridCell(event) {

    event.preventDefault();
    var code = event.charCode || event.keyCode;
    var $highlight = $('#recordedlines .column.highlight').length > 0 ? $('#recordedlines .column.highlight:first') : null;

    if( $highlight===null ){

      var x = 0;
      var y = 0;

    } else {

      var x = $highlight.index();
      var y = $highlight.parents('.record').index();

      var xm = $('#recordedlines .record:first .column').length - 1;
      var ym = $('#recordedlines .record').length - 1;

      switch ( code ) {
        case 38: // Key up
          y--;
          break;
        case 39: // Key right
          x++;
          break;
        case 40: // Key down
          y++;
          break;
        case 37: // Key left
          x--;
          break;
      }

      if( x > xm ) {
        x = 0;
        y++;
      }

      if( y > ym )
        y = 0;

      if( x < 0 ) {
        x = xm;
        y--;
      }

      if( y < 0 )
        y = ym;

    }

    highlightGridCell(x,y);
  }

  function highlightGridCell(x,y) {
    x++;
    y++;
    $('.highlight').removeClass('highlight');
    $('#recordedlines .record:nth-child(' + y + ') .column:nth-child(' + x + ')').addClass('highlight');
  }

  function manifyGridCell(event) {

    event.preventDefault();
    var code = event.charCode || event.keyCode;

    $('body').toggleClass('manify');
  }

};

$(document).on('ready', init);