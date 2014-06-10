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
  $('.copyCaption').on('click', onCopyCaption);

  $('#editor .thumbs, #editor .thumbslegends').on('mousewheel', onMouseWheelColumn);
  $('#editor input[type="range"]').on('change', onImageRangeChange);
  $('#editor .btn#bold, #editor .btn#italic').on('click', onToggleStyle );
  $('#editor .images .btn[data-toggle]').on('click', onToggleImage );

  init();

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

    var $imgscontainer = $('#editor .images[columnname="'+data.column+'"]');
    var $imgsbox = $('#editor .images[columnname="'+data.column+'"] .thumbs');
    var $lgdsbox = $('#editor .images[columnname="'+data.column+'"] .thumbslegends');
    var $select  = $('#editor .images[columnname="'+data.column+'"] select');
    var $input  = $('#editor .images[columnname="'+data.column+'"] input[type="range"]');

    var index = Math.floor($imgsbox.find('img:last').attr('index'))+1;
    if( isNaN(index) )
      index = 0;

    console.log('index after',index);

    $imgscontainer.addClass('new-image');

    $img = $('<img>')
        .addClass('thumb')
        .attr('index', index)
        .attr('alt', data.note.text)
        .attr('src', data.src)

    $lgd = $('<p>')
        .addClass('thumblegend')
        .attr('index', index)
        .html(data.note.text)

    if(index!=0){
      $img.hide();
      $lgd.hide();
    }

    $imgsbox.append( $img );
    $lgdsbox.append( $lgd );

    var delay = setTimeout(function() {
      $imgscontainer.removeClass('new-image');
      clearTimeout(delay);
    }, 5000);

    $select.append(
      $('<option>')
        .attr('index', index)
        .attr('value', data.note.time + '_' + data.ts + '.jpg' )
        .html(data.note.time + '_' + data.ts + '.jpg')
    );

    $input.attr('max', index+1 );

  };

  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  function onCopyCaption(e){
    //console.log(e);
    var columnName = $(e.currentTarget).attr('columnName');
    var val = $("textarea#caption").val();

    console.log("columnName", columnName);

    $("textarea#caption").val(
      val + $('.images[columnName="'+columnName+'"] .thumbs img.on').attr("alt")
    );
  }
  /* dom */
  function sendNewLine() {

    var images = {};

    $('#editor .images').each(function(i){
      var image;
      if ( $(this).hasClass('selected') )image = $(this).find('option[selected="selected"]').val();
      else image = false;

      images[$(this).attr('columnName')] = image;
    });

    var time  = new Date();
    var timeString = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();

    var line = {
      session : app.session,
      time    : time.getTime(),
      timeString : timeString,
      caption  : formatCaption($('#caption').val()),
      images  : images
    }
    console.log(line);

    // Reset
    $('#caption').val("");
    $('#editor .btn[data-toggle].active').trigger('click');
    $('#editor input[type="range"]').each(function(index, el) {
      var max = $(this).attr('max');
      changeVisibleImage($(this).parents('.images'), max-1);
    });

    socket.emit('newLine', line);
  };

  function onMouseWheelColumn(event){
    //console.log('mousewheel deltaY', event.deltaY);
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
    //console.log('changeVisibleImage', index);

    $col.find('img, .thumblegend').hide().removeClass('on');
    $('img[index="'+index+'"], .thumblegend[index="'+index+'"]', $col).show().addClass('on');

    $('option', $col).removeAttr('selected');
    $('select option[index="'+index+'"]',$col).attr('selected', true);

    $('input[type="range"]', $col).val(index+1);
  };

  function onToggleImage(){
    console.log('onToggleImage');
    $(this).parents('.images').toggleClass('selected');
    $('span',$(this)).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open');
  }

  function onToggleStyle(){
    if( $(this).is("#bold") )
      $('#italic').removeClass('active');
    else
      $('#bold').removeClass('active');
  }

  function init(){
    $('.thumbs img:first-child, .thumbslegends p:first-child').addClass('on');
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

  function formatCaption(c){
    if( $('#bold').hasClass('active') )
      c = '**'+c+'**';
    else if( $('#italic').hasClass('active') )
      c = '*'+c+'*';

    return c;
  }

});