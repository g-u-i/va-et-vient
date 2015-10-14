var center = view.center;
var width = view.size.width;
var height = view.size.height;

function Chicoree(_destinationX, _destinationY, _position){
  this.destinationX = _destinationX;
  this.destinationY = _destinationY;
  this.position = _position;
  this.Color = "#b7304d";
  var chicoreeTarget = [];
  var chicoreeBalls = [];

  for(var i=0; i<4; i++){
    var myCircle = new Path.Circle(new Point(100, 70), 50 *i);
    chicoreeTarget.push(myCircle);
  }

  for(var i=0; i<8; i++){
    var myPoint = new Path.Circle(new Point(100, 70), 5);
    myPoint.position.x+= Math.random() * 80 - 30;
    myPoint.position.y+= Math.random() * 80 - 30 ;
    var radius = Math.random() * 0.6 + 0.3;
    chicoreeBalls.push(myPoint);
    myPoint.scale(radius);
  }

  this.chicoree = new CompoundPath({
    children: chicoreeTarget,
    strokeColor: this.Color,
    strokeWidth: 3,
    strokeCap: 'round',
  });

  this.chicoreeBalls = new CompoundPath({
    children: chicoreeBalls,
    fillColor: this.Color,
  });

  this.item = new Group({
    children: [this.chicoree, this.chicoreeBalls],
    transformContent: false,
    position: this.position
  });

  this.chicoree.scale(0.2);


}

Chicoree.prototype = {
  move: function(event, i){
    this.position.x +=this.destinationX;
    this.position.y +=this.destinationY;
    if(this.position.x > width || this.position.x < 0){
      this.destinationX = -this.destinationX;
    }
    if(this.position.y > height || this.position.y < 0){
      this.destinationY = -this.destinationY;
    }
    this.item.position = this.position;
  },
  zumba: function(event, i){
    for(var a=0; a<this.chicoreeBalls.children.length; a++){
      var itemXPos = this.chicoreeBalls.children[a].position.x;
      var itemYPos = this.chicoreeBalls.children[a].position.y;
      var itemXSpeed = Math.random() * 0.3 - 0.15;
      var itemYSpeed = Math.random() * 0.3 - 0.15;   
      this.chicoreeBalls.children[a].position.x+=itemXSpeed;
      this.chicoreeBalls.children[a].position.y+=itemYSpeed;
    }
  }
}

//--------------------- main ---------------------

var allChicoree = [];
var number = 15;

for (var i = 0; i < number; i++) {
  var destinationX = Math.random() * 1 - 0.5;
  var destinationY = Math.random() * 1 - 0.5;
  var position = Point.random() * view.size;
  allChicoree.push(new Chicoree(destinationX, destinationY, position));
}

function onFrame(event) {
  for (var i = 0, l = allChicoree.length; i < l; i++) {
    allChicoree[i].move(event, i);
    allChicoree[i].zumba(event, i);
  }
}
