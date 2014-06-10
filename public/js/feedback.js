jQuery(document).ready(function($) {

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

  /* dom */
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
      case 27: // echap
        unselectGridCell(event);
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
    console.log(data);

    var $newline = $('<article>')
        .addClass('record row')
        .append(
          $('<p>')
          .addClass('legend col-xs-3')
          .html(data.caption)
          .prepend(
            $('<span>')
            .addClass('.time')
            .html(data.timeString)
          )
        );

    for(folder in data.images){

      var $col = $('<div>').addClass('col-xs-3');
      var src = '/'+data.session+'/'+folder+'/'+data.images[folder];

      if(data.images[folder])$col.append($('<img>').addClass('thumb').attr('src', src));

      $newline.append($col);
    }

    $newline.appendTo('#content');
  };

  function selectGridCell(event) {

    event.preventDefault();
    var code = event.charCode || event.keyCode;
    var $highlight = $('#content .column.highlight').length > 0 ? $('#content .column.highlight:first') : null;

    if( $highlight===null ){

      var x = 0;
      var y = 0;

    } else {

      var x = $highlight.index();
      var y = $highlight.parents('.record').index();

      var xm = $('#content .record:first .column').length - 1;
      var ym = $('#content .record').length - 1;

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

  function unselectGridCell(event) {
    $('.highlight').removeClass('highlight');
  }

  function highlightGridCell(x,y) {
    x++;
    y++;
    $('.highlight').removeClass('highlight');
    $('#content .record:nth-child(' + y + ') .column:nth-child(' + x + ')').addClass('highlight');
  }

  function manifyGridCell(event) {

    event.preventDefault();
    var code = event.charCode || event.keyCode;

    $('body').toggleClass('manify');
  }

});