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

  // fluxVideo();
  fluxWebcam();

  function fluxWebcam(){
    var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#capture-btn'),
      width = 520,
      height = 0;

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
    navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    socket.emit('imageCapture', {data: data, id: sessionId, name: app.session});
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

    }

  function fluxVideo(){

    // Our element ids.
    var options = {
      video: '#video',
      canvas: '#canvas',
      captureBtn: '#capture-btn',
    };

    // Our object _this will hold all of the functions.
    var App = {
      // Get the video element.
      video: document.querySelector(options.video),
      // Get the canvas element.
      canvas: document.querySelector(options.canvas),
      // Get the canvas context.
      ctx: canvas.getContext('2d'),
      // Get the capture button.
      captureBtn: document.querySelector(options.captureBtn),
      // This will hold the video stream.
      localMediaStream: null,
      // This will hold the screenshot base 64 data url.
      dataURL: null,
      // This will hold the converted PNG url.
      imageURL: null,

    initialize: function() {
      var _this = this;
      // Check if navigator object contains getUserMedia object.
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      // Check if window contains URL object.
      window.URL = window.URL || window.webkitURL;

      // Check for getUserMedia support.
      if (navigator.getUserMedia) {
        // Get video stream.
        navigator.getUserMedia({
          video: true
        }, _this.gotStream, _this.noStream);

        // Bind capture button to capture method.
        this.captureBtn.onclick = function () {
          _this.capture();
          socket.emit('newCapture', {id: sessionId, name: app.session});

        };
      } else {
        // No getUserMedia support.
        alert('Your browser does not support getUserMedia API.');
      }
    },

    // Stream error.
    noStream: function (err) {
      alert('Could not get camera stream.');
      console.log('Error: ', err);
    },

    // Stream success.
    gotStream: function (stream) {
      // Feed webcam stream to video element.
      // IMPORTANT: video element needs autoplay attribute or it will be frozen at first frame.
      if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
      } else {
        video.src = stream; // Opera support.
      }

      // Store the stream.
      App.localMediaStream = stream;
    },

    // Capture frame from live video stream.
    capture: function () {
      var _this = this;

      // Check if has stream.
      if (_this.localMediaStream) {
        // Draw whatever is in the video element on to the canvas.
        _this.ctx.drawImage(video, 0, 0);
        // Create a data url from the canvas image.
        _this.dataURL = canvas.toDataURL('image/png');
        console.log(_this.dataURL);
        // Call our method to save the data url to an image.
        _this.saveDataUrlToImage();
      }
    },

    saveDataUrlToImage: function () {
      var _this = this;
      var options = {
        // Change this to your own url.
        url: 'http://localhost:8080'
      };

      // Make an ajax request to our server to convert the dataURL to a PNG image,
      // and return the url of the converted image.
      // _this.imageURLInput.value = 'Generating url ...';

      var data = 'base64=' + _this.dataURL;

      var request = new XMLHttpRequest();
      request.open('POST', options.url, true);

      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = function() {
        var response = JSON.parse(request.responseText);
        console.log('Response: ', request);
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send(data);
    }

  };

  // Initialize our application.
  App.initialize();

  // Expose to window object for testing purposes.
  window.App = App || {};
}

});