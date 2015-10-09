var center = view.center;
var width = view.size.width;
var height = view.size.height;

function Potimarron(_radius, _destination, _position){
  this.radius = _radius;
  this.destination = _destination;
  this.position = _position;

  // CREATE THE SHAPE
  this.path = new Path({
    fillColor: 'orange',
  });
  this.path.add([20, 10], [43, 4], [62,3],[90, 38],[82,56], [67,72],[32,69], [15, 54], [9, 41]);
  this.path.closed = true;
  this.path.position = this.position;
  this.path.scale(this.radius);
  this.path.opacity = 0.8;
}

Potimarron.prototype = {
  move: function(event, i){
    var vector = this.destination - this.position;
    this.position += vector /100;
    if (vector.length < 5){
      this.destination = Point.random() * view.size;
    }
    var delta = (this.destination - this.position) / (i+100);
    this.path.rotate(Math.sin((event.count + i) / 50 + (i*2)) * 2);
    if (delta.length > 0.1){
      this.position += delta;
    }
    this.path.position = this.position;
  }
}

//--------------------- main ---------------------

var potimarrons = [];
var number = 3;

for (var i = 0; i < number; i++) {
  var destination = Point.random() * view.size;
  var position = Point.random() * view.size;
  var radius = Math.random() * 3 + 1;
  potimarrons.push(new Potimarron(radius, destination, position));
}

function onFrame(event) {
  for (var i = 0, l = potimarrons.length; i < l; i++) {
    potimarrons[i].move(event, i);
  }
}
