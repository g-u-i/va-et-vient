function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);
  var sessionId = '';

  var vid_h=1080,vid_w=1920;

  var firstNoteSelector = "#notes table tr:first-child td:last-child p";

  $(document).on('keypress', keyListenner);

  socket.on('newNote', onNewNote);
  $('#Snapshot').on('click', onSendCapture);
  $('#nextNote').on('click', onNextNote);


  function keyListenner(event) {
    console.log( String.fromCharCode(event.which) );
    switch ( String.fromCharCode(event.which) ) {
      case " ":
        event.preventDefault();
        sendCapture();
        break;
    }
  }

  function init_camera(){

    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia = ( navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia ||
                               navigator.msGetUserMedia);

    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    if (navigator.getUserMedia && window.URL) {
      var video = document.getElementById('my_camera');

      navigator.getUserMedia(
        // constraints
        {
          "audio": false,
          "video": { "mandatory": { "minWidth": vid_h, "minHeight": vid_h } }
        },
        // successCallback
        function(stream) { // got access, attach stream to video
          video.src = window.URL.createObjectURL( stream ) || stream;
        },
        // errorCallback
        function(err) {
           console.log("The following error occured: " + err);
        }
      );
    }
    else {
      alert("getUserMedia not supported on your machine!");
    }
  }
  function onNewNote(req){
    // console.log(req);
    if(req.column == app.column){
      $("#notes table").append('<tr><td><p class="counter"></p></td><td><p>'+req.text+'</p></td></tr>');
      $("#notes table tr:last-child p").attr(req);
    }

  };
  function onSendCapture(event){

    $('#capture .result').removeClass('show');

    var video = document.getElementById('my_camera');
    var canvas = document.createElement('canvas');

    canvas.width = vid_w;
    canvas.height = vid_h;

    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, vid_w, vid_h);

    var data_uri = canvas.toDataURL('image/jpeg', 1.0 );
    var data = {
      imgBase64: data_uri,
      session:app.session,
      column:app.column,
      note: {
        time: $(firstNoteSelector).attr("time"),
        text: $(firstNoteSelector).attr("text"),
        path: $(firstNoteSelector).attr("path")
      }
    }
    if($(firstNoteSelector).length > 0) socket.emit('capture', data);


    $('#capture .result').html( '<img src="'+data_uri+'">' );
    $('#capture .result').addClass('show');
  }
  function onNextNote(e){

    var data = {
        session : app.session,
        column : $(firstNoteSelector).attr('column'),
        time : $(firstNoteSelector).attr('time'),
        text : $(firstNoteSelector).attr('text'),
        done : true
    };

    console.log(data);

    socket.emit('updateNote', data);

    $("#notes table tr:first-child").animate({
      opacity: 0}, 500, function() { $(this).remove();
    });
  }
  init_camera();
};
$(document).on('ready', init);