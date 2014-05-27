function init() {
  var vid_h=1080,vid_w=1920;
  init_camera();

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
  function take_snapshot(event){

    $('#capture .result').removeClass('show');

    // take snapshot and get image data
    var video = document.getElementById('my_camera');

    var canvas = document.createElement('canvas');
    canvas.width = vid_w;
    canvas.height = vid_h;
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, vid_w, vid_h);
    var data_uri = canvas.toDataURL('image/jpeg', 1.0 );

    $.ajax({
      type: "POST",
      url: "/newImage",
      data: {imgBase64: canvas.toDataURL('image/jpeg', 1.0 ), path:$( "#folder" ).val()}
    }).done(function(image) {
      $('#capture .result').html( '<img src="'+data_uri+'">' );
      $('#capture .result').addClass('show');
    });
    return canvas.toDataURL('image/jpeg', 1.0 );
    // display results in page
  }
  $( "#Snapshot" ).click(function(event) {
    take_snapshot(event);
  });
};
$(document).on('ready', init);