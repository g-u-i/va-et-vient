var center = view.center;
var width = view.size.width;
var height = view.size.height;

function Radis(_radius, _radius2, _destination, _position){
  this.destination = _destination;
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
  },
  zumba: function(event, i){
    var radius = Math.random() * 5 + 50;
    var radius2 = Math.random() * 7 + 20;
    
    var children = this.radis.children;
    // for(var i=0; i<children.length; i++){
    //   var randomScale = Math.random();
    //   //console.log(children[i].radius);
    //   children[i].scale(randomScale);
    //   //this.radis.rotate(Math.sin((event.count + i) / 50 + (i*2)) * 2);
    // }
    // var scaleChild = 1;
    // scaleChild = i;
    // if(scaleChild>3){
    //   scaleChild = 1;
    // }
    // children[0].scale(scaleChild);
    //this.radis.rotate(Math.sin((event.count + i) / 50 + (i*2)) * 2);
    //console.log(this.item.children);
    // var randomScale = Math.random();
    //this.item.scale(3);
  }
}

//--------------------- main ---------------------

var allRadis = [];
var number = 15;

for (var i = 0; i < number; i++) {
  var destination = Point.random() * view.size;
  var position = Point.random() * view.size;
  var radius = Math.random() * 5 + 50;
  var radius2 = Math.random() * 7 + 20;
  allRadis.push(new Radis(radius, radius2, destination, position));
}

function onFrame(event) {
  for (var i = 0, l = allRadis.length; i < l; i++) {
    //allRadis[i].move(event, i);
    allRadis[i].zumba(event, i);
  }
}
