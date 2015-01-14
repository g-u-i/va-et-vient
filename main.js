var fs = require('fs-extra'),
		glob = require("glob"),
		path = require("path"),
		gm = require('gm'),
		markdown = require( "markdown" ).markdown,
		exec = require('child_process').exec,
		phantom = require('phantom');

var uploadDir = '/uploads';


module.exports = function(app, io){

	console.log("main module initialized");
	var sessions_p = "sessions/"

	io.on("connection", function(socket){
		// socket.on("newLine", onNewLine);
		socket.on("newUser", onNewUser);
		socket.on("imageCapture", onNewImage);
		// socket.on("newCapture", onCapture);
	});

	// events

	function onNewUser(req){
		console.log(req);
	};

	function onNewImage(req) {

		function decodeBase64Image(dataString) {
  			var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    		response = {};

		  if (matches.length !== 3) {
		    return new Error('Invalid input string');
		  }

		  response.type = matches[1];
		  response.data = new Buffer(matches[2], 'base64');

		  return response;
		}

		var imageBuffer = decodeBase64Image(req.data);
		console.log(imageBuffer);
		filename = 'sessions/' + req.name + '/' + Date.now() + '.jpg';
		console.log(filename);
		fs.writeFile(filename , imageBuffer.data, function(err) { 
			console.log(err);
		});
	}

	function onCapture(req){
		console.log("Capture cliqué");
		if (req.method === 'POST') {
	    	var body = '';
	    	req.on('data', function(data) {
	      		body += data;
	    	});
	    	req.on('end', function () {
				var filename = generateFilename();
				var filepath = __dirname + 'session/' + req.session + '/' + filename;
				var params = qs.parse(body);

				if (!params.base64) {
					return errResponse('base64 parameter required');
	      		}

				base64ToFile(params.base64, filepath, function(err, filepath) {
		        	if (err) {
		          		errResponse(err);
		          		return;
		        	}
				
					var imageurl = 'http://localhost:8080/select/' + req.session + "/capture" + uploadDir + '/' + filename;

		        	successResponse({image_url: imageurl});
		      	});
	   		});
	  	} else {
	    	var file = __dirname + req.url;

	    	var ext = file.split('.');
	    	ext = ext[ext.length-1];
	    	if (/png/gi.test(ext)) {
	      		var filename = path.basename(file);
	      		var mimetype = 'image/' + ext;

	      		res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	      		res.setHeader('Content-type', mimetype);

	      		var filestream = fs.createReadStream(file);
	      		filestream.pipe(res);
	    	}
	  	}

		var headers = {
		    'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
		    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
		    'Content-Type': 'application/json'
		};

		function successResponse(data) {
			res.writeHead(200, headers);
			res.write(JSON.stringify(data));
			res.end();
		}


		function errResponse(err) {
			console.log(err);
			res.writeHead(500, headers);
			res.write(JSON.stringify({error: err}));
			res.end();
		}

		function base64ToFile(base64, filename, callback) {
		  var buff = new Buffer(base64.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

		  fs.writeFile(filename, buff, function(err) {
		    callback(err, filename);
		  });
		}


		function generateFilename() {
		  return Date.now() + '.png';
		}
	}

  // helpers
  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  function timestampToTimer(time){
      var d = new Date(time);
      return pad(d.getHours()   ,2) + ':' + 
             pad(d.getMinutes() ,2) + ':' + 
             pad(d.getSeconds()   ,2);
  }

};