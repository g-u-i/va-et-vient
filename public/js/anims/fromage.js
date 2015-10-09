var center = view.center;
var width = view.size.width;
var height = view.size.height;

function Fromage(_radius, _destination, _position){
  this.radius = _radius;
  this.destination = _destination;
  this.position = _position;

  // CREATE THE SHAPE
  this.path = new Path({
    fillColor: '#f9d638',
  });
  this.path.add([30, 30], [92, 28], [110,65],[20, 68]);
  this.path.closed = true;
  this.path.position = this.position;
  this.path.scale(this.radius);
  this.path.opacity = 0.8;
}

Fromage.prototype = {
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

var fromages = [];
var number = 3;

for (var i = 0; i < number; i++) {
  var destination = Point.random() * view.size;
  var position = Point.random() * view.size;
  var radius = Math.random() * 2 + 1;
  fromages.push(new Fromage(radius, destination, position));
}

function onFrame(event) {
  for (var i = 0, l = fromages.length; i < l; i++) {
    fromages[i].move(event, i);
  }
}
