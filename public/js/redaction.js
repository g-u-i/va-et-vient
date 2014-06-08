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
  socket.on('newImage', onNewImage);

  /* dom */
  $('#send').on('click', sendNewLine);
  $('.editor .thumbs').on('mousewheel', onMouseWheelColumn);
  $('.editor input[type="range"]').on('change', onImageRangeChange);
  $('.editor .btn#bold, .editor .btn#italic').on('click', onToggleStyle );
  $('.editor .images .btn[data-toggle]').on('click', onToggleImage );

  // $(document).on('keypress', keyListenner);

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

  function onNewImage(data) {
    console.log('new image :: data', data);

    var $imgsbox = $('.editor .images[columnName="'+data.column+'"] .thumbs');
    var $select  = $('.editor .images[columnName="'+data.column+'"] select');

    var index = Math.floor($imgsbox.find('img:last').attr('index'))+1;

    $imgsbox.addClass('new-image').append(
      $('<img>')
        .addClass('thumb')
        .attr('index', index)
        .attr('alt', "")
        .attr('src', data.src)
        .hide()
    );

    $imgsbox.removeClass('new-image');

    $select.append(
      $('<option>')
        .attr('index', index)
        .attr('value', data.img)
        .html(data.img)
    );
  };

  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  /* dom */
  function sendNewLine() {

    var legend = $('#legend').val();
    var data = {};
    data.session = app.session;
    data.images = {};

    if( $('#bold').hasClass('active') )
      legend = '**'+legend+'**';
    else if( $('#italic').hasClass('active') )
      legend = '*'+legend+'*';

    data.legend = legend;

    $('.editor .images').each(function(i){
      if ( $(this).hasClass('selected') ) {
        data["image-"+$(this).attr('columnName')] = $(this).find('option[selected="selected"]').val();
      }else{
        data["image-"+$(this).attr('columnName')] = false;
      }
    });
    $.ajax({
      url:  '/newline',
      type: 'POST',
      dataType: 'json',
      data: data
    });
  };

  function onMouseWheelColumn(event){
    // console.log('mousewheel deltaY', event.deltaY);
    var $newVisible;

    if(event.deltaY > 0){
      if($(this).find('img:visible').next().size()){
        $newVisible = $(this).find('img:visible').next();
      }else{
        $newVisible = $(this).find('img:first-child');
      }
    }else if(event.deltaY < 0){
      if($(this).find('img:visible').prev().size()){
        $newVisible = $(this).find('img:visible').prev();
      }else{
        $newVisible = $(this).find('img:last-child');
      }
    }

    changeVisibleImage($(this).parents('.images'), parseInt($newVisible.attr('index')));
  };

  function onImageRangeChange(event){
    console.log("onImageRangeChange");
    changeVisibleImage($(this).parents('.images'), $(this).val()-1);
  };

  function changeVisibleImage($col, index){
    console.log('changeVisibleImage', index);

    $col.find('img').hide();
    $('img[index="'+index+'"]', $col).show();

    $('option', $col).removeAttr('selected');
    $('select option[index="'+index+'"]',$col).attr('selected', true);

    $('input[type="range"]', $col).val(index+1);
  };

  function onToggleImage(){
    console.log('onToggleImage');
    $(this).parents('.images').toggleClass('selected');
  }

  function onToggleStyle(){
    if( $(this).is("#bold") )
      $('#italic').removeClass('active');
    else
      $('#bold').removeClass('active');
  }

  function keyListenner(event) {

    switch ( event.key ) {
      case "Up":
      case "Right":
      case "Down":
      case "Left":
        selectGridCell(event);
        break;
    }
  };

  function selectGridCell(event) {

    event.preventDefault();
    var $highlight = $('#recordedlines .images.highlight').length > 0 ? $('#recordedlines .images.highlight:first') : null;

    if( $highlight===null ){

      var x = 0;
      var y = 0;

    } else {

      var x = $highlight.index();
      var y = $highlight.parents('.record').index();
      switch ( event.key ) {
        case "Up":
          y--;
          break;
        case "Right":
          x++;
          break;
        case "Down":
          y++;
          break;
        case "Left":
          x--;
          break;
      }

    }

    // x++;
    // y++;

    // console.log('x: ',x + '(' + ($('#recordedlines .record:nth-child(' + y + ') .column').length - 1) + ')');
    // console.log('y: ',y + '(' + ($('#recordedlines .record').length -1) + ')');

    // if( y < 0 ) y = 0;
    // if( y > $('#recordedlines .record').length - 1 ) y = 0;

    // if( x < 0 ) x = 0;
    // if( x > $('#recordedlines .record:nth-child(' + y + ') .column').length - 1 ) x = 0;


    highlightGridCell(x,y);
  };

  function highlightGridCell(x,y) {
    console.log('x: ',x);
    console.log('y: ',y);
    $('.highlight').removeClass('highlight');
    $('#recordedlines .record:nth-child(' + y + ') .images:nth-child(' + x + ')').addClass('highlight');
  };

  /**
  * helpers
  */
  function addNewLine(data){
    var $newline = $('<article>').addClass('record row lead')
        .append($('<p>').addClass('legend col-xs-3').html(data.legend));

    for(folder in data.images){
      var $col = $('<div>').addClass('col-xs-3');
      console.log(data.images[folder]);
      if(data.images[folder]!="false"){
        var src = '/'+data.session+'/'+folder+'/'+data.images[folder];
        $col.append($('<img>').addClass('thumb').attr('src', src));
      }
      $newline.append($col);
    }

    $newline.appendTo('#content');
  };

});