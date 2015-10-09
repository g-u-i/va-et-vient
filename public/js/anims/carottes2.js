var center = view.center;
var width = view.size.width;
var height = view.size.height;

function Carotte(_radius, _destination, _position){
  this.radius = _radius;
  this.destination = _destination;
  this.position = _position;

  // CREATE THE SHAPE
  //var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
  this.path = new Path.Rectangle(new Point(50, 50), new Point(250, 100));
  this.path.fillColor = '#e94e1b';
  this.path.position = this.position;
  this.path.scale(0.8);
  this.path.opacity = 0.8;
}

Carotte.prototype = {
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

var carottes = [];
var number = 5;

for (var i = 0; i < number; i++) {
  var destination = Point.random() * view.size;
  var position = Point.random() * view.size;
  var radius = Math.random() * 3 + 1;
  carottes.push(new Carotte(radius, destination, position));
}

function onFrame(event) {
  for (var i = 0, l = carottes.length; i < l; i++) {
    carottes[i].move(event, i);
  }
}
