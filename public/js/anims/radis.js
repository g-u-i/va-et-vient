var center = view.center;
var width = view.size.width;
var height = view.size.height;
var count = 0;

function Radis(_radius, _radius2, _destinationX, _destinationY, _position){
  count ++;
  this.destinationX = _destinationX;
  this.destinationY = _destinationY;
  this.position = _position;
  this.radius = _radius;
  this.radius2 = _radius2;
  var offx = this.position.x;
  var offy = this.position.y;
  var radisChildren = [];
  for(var i = 0; i<360; i+=9){
    var x1 = offx + Math.cos(i) * this.radius;
    var y1 = offy +  Math.sin(i) * this.radius;
    var x2 = offx + Math.cos(i) * this.radius2;
    var y2 = offy +  Math.sin(i) * this.radius2;

    var path = new Path(new Point(x1, y1), new Point(x2, y2));
    var randomScale = Math.random();
    path.scale(randomScale);
    radisChildren.push(path);
  }
  this.radis = new CompoundPath({
    children: radisChildren,
    strokeColor: '#000',
    strokeWidth: 3,
    strokeCap: 'round',
  });

  this.item = new Group({
    children: [this.radis],
    transformContent: false,
    position: this.position
  });
}

Radis.prototype = {
  move: function(event, i){
    this.position.x +=this.destinationX;
    this.position.y +=this.destinationY;
    if(this.position.x > width || this.position.x < 0){
      this.destinationX = -this.destinationX;
    }
    if(this.position.y > height || this.position.y < 0){
      this.destinationY = -this.destinationY;
    }
    this.radis.position = this.position;
  },
  zumba: function(event, i){
    for(var a=0; a<this.radis.children.length; a++){
      var itemXPos = this.radis.children[a].position.x;
      var itemYPos = this.radis.children[a].position.y;
      var itemXSpeed = Math.random() * 0.3 - 0.15;
      var itemYSpeed = Math.random() * 0.3 - 0.15;   
      this.radis.children[a].position.x+=itemXSpeed;
      this.radis.children[a].position.y+=itemYSpeed;
    }
  }
}

//--------------------- main ---------------------

var allRadis = [];
var number = 15;

for (var i = 0; i < number; i++) {
  var destinationX = Math.random() * 1 - 0.5;
  var destinationY = Math.random() * 1 - 0.5;
  var position = Point.random() * view.size;
  var radius = Math.random() * 5 + 50;
  var radius2 = Math.random() * 7 + 20;
  allRadis.push(new Radis(radius, radius2, destinationX, destinationY, position));
}

function onFrame(event) {
  for (var i = 0, l = allRadis.length; i < l; i++) {
    allRadis[i].move(event, i);
    allRadis[i].zumba(event, i);
  }
}
