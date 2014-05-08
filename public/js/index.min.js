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
  socket.on('newImage', onNewImage);

  /* dom */
  $('#send').on('click', sendNewLine);
  $('.column .images').on('mousewheel', onMouseWheelColumn);
  $('.column .range input[type="range"]').on('change', onImageRangeChange);

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
    var $imgsbox = $('.column.image[foldername="'+data.folder+'"] .images');
    var $select = $('.column.image[foldername="'+data.folder+'"] select');
    var index = Math.floor($imgsbox.find('img:last').attr('index'))+1;

    $imgsbox.addClass('new-image').append(
      $('<img>')
        .addClass('vignette')
        .attr('index', index)
        .attr('alt', "")
        .attr('src', data.src)
        .hide()
    );

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
    var data = {};
    data.legend = $('#legend').val();
    data.images = {};
    $('#lineForm .column.image').each(function(i){
      data["image-"+$(this).attr('foldername')] = $(this).find('option[selected="selected"]').val();
    });
    console.log("data", data);
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

    changeVisibleImage($(this).parents('.column'), parseInt($newVisible.attr('index')));
  };

  function onImageRangeChange(event){
    console.log("onImageRangeChange");
    changeVisibleImage($(this).parents('.column'), $(this).val()-1);
  };

  function changeVisibleImage($col, index){
    console.log('changeVisibleImage', index);

    $col.find('img').hide();
    $('img[index="'+index+'"]', $col).show();

    $('option', $col).removeAttr('selected');
    $('select option[index="'+index+'"]',$col).attr('selected', true);

    $('input[type="range"]', $col).val(index+1);

  };

  /**
  * helpers
  */
  function addNewLine(data){
    var $newline = $('<div>').addClass('record').addClass('row')
        .append($('<p>').addClass('legend').addClass('column').html(data.legend));

    for(folder in data.images){
      var src = '/images/'+folder+'/'+data.images[folder];
      $newline.append($('<div>').addClass('column').append($('<img>').addClass('vignette').attr('src', src)));
    }

    $newline.appendTo('#recordedlines');
  };


};

$(document).on('ready', init);