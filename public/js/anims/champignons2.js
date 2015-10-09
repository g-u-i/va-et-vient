var center = view.center;
var width = view.size.width;
var height = view.size.height;

function Champignon(_radius, _destination, _position){
  this.radius = _radius;
  this.destination = _destination;
  this.position = _position;

  // CREATE THE SHAPE
  this.path = new Path({
    fillColor: '#3e3217',
  });


  // // Add a segment with handles:
  // var point = new Point(100, 20);
  var handleIn = new Point(-50, 0);
  var handleOut = new Point(50, 0);
  // var added = path.add(new Segment(point, handleIn, handleOut));
  //var point1 = new Point(50,40);
  var point1 = new Segment(new Point(50, 40), new Point(-5, -10), new Point(0, 0));
  // var point2 = new Point(70,30);
  var point2 = new Segment(new Point(70, 30), new Point(0, 0), new Point(10, 18));
  var point3 = new Segment(new Point(50, 90), new Point(25, -9), new Point(-20, 9));
  var point4 = new Segment(new Point(-5, 70), new Point(10, 20), new Point(-10, -20));
  var point5 = new Segment(new Point(15, 22), new Point(-15, 5), new Point(15, -5));

  this.path.add(point1, point2, point3, point4, point5);
  this.path.closed = true;
  this.path.position = this.position;
  this.path.scale(this.radius);
  this.path.opacity = 0.8;
}

Champignon.prototype = {
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

var champignons = [];
var number = 3;

for (var i = 0; i < number; i++) {
  var destination = Point.random() * view.size;
  var position = Point.random() * view.size;
  var radius = Math.random() * 3 + 1;
  champignons.push(new Champignon(radius, destination, position));
}

function onFrame(event) {
  for (var i = 0, l = champignons.length; i < l; i++) {
    champignons[i].move(event, i);
  }
}
