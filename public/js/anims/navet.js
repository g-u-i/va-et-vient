var center = view.center;
var width = view.size.width;
var height = view.size.height;
var shrinkOrGrow = 0;

function Navet(_destinationX, _destinationY, _position, _rotation){
  this.destinationX = _destinationX;
  this.destinationY = _destinationY;
  this.position = _position;
  this.rotation = _rotation;
  this.Color = "#f2b7d1";
  var navetPath = [];

  var pathData = "m 1189.302,70.223 c 0,0 0,0 0,-0.002 -1.406,-0.889 -2.67,-2.729 -2.363,-4.529 l 0.025,-0.094 c 0.668,-1.768 0.104,-4.271 -1.26,-5.582 l -0.062,-0.072 c -0.689,-0.98 -0.838,-2.408 -0.4,-3.816 0.438,-1.412 1.373,-2.508 2.5,-2.928 l 0.094,-0.025 c 1.857,-0.309 3.742,-2.051 4.203,-3.883 l 0.033,-0.092 c 0.469,-1 1.48,-1.791 2.775,-2.168 1.521,-0.445 3.09,-0.227 4.113,0.613 l 0.068,0.068 c 0.291,0.354 0.66,0.672 1.098,0.947 1.326,0.84 3.041,1.135 4.367,0.756 l 0.094,-0.018 c 0.797,-0.07 1.637,0.16 2.428,0.66 1.406,0.889 2.67,2.729 2.365,4.529 l -0.025,0.094 c -0.67,1.768 -0.104,4.271 1.26,5.58 l 0.062,0.074 c 0.688,0.98 0.838,2.408 0.4,3.816 -0.438,1.412 -1.373,2.508 -2.5,2.928 l -0.094,0.025 c -1.857,0.309 -3.744,2.051 -4.203,3.883 l -0.033,0.09 c -0.471,1.002 -1.482,1.793 -2.775,2.17 -1.521,0.443 -3.094,0.227 -4.115,-0.615 l -0.068,-0.066 c -0.291,-0.354 -0.658,-0.672 -1.096,-0.949 -1.326,-0.838 -3.043,-1.133 -4.367,-0.754 l -0.096,0.018 c -0.795,0.068 -1.635,-0.158 -2.428,-0.658 z m -1.385,-4.321 c -0.174,1.182 0.643,2.666 1.92,3.473 l 0,0 c 0.59,0.373 1.199,0.551 1.762,0.512 1.58,-0.434 3.586,-0.088 5.129,0.887 0.51,0.322 0.945,0.697 1.301,1.115 0.754,0.594 1.988,0.74 3.164,0.398 0.984,-0.287 1.775,-0.881 2.129,-1.592 0.574,-2.184 2.73,-4.174 4.947,-4.568 0.809,-0.322 1.516,-1.188 1.854,-2.271 0.34,-1.098 0.25,-2.18 -0.24,-2.908 -1.611,-1.584 -2.258,-4.447 -1.482,-6.57 0.176,-1.184 -0.643,-2.666 -1.918,-3.473 -0.592,-0.373 -1.199,-0.551 -1.764,-0.512 -1.58,0.432 -3.586,0.088 -5.127,-0.887 -0.51,-0.32 -0.947,-0.697 -1.301,-1.117 -0.764,-0.6 -1.99,-0.74 -3.164,-0.396 -0.984,0.287 -1.777,0.881 -2.131,1.592 -0.574,2.184 -2.729,4.174 -4.945,4.568 -0.809,0.32 -1.518,1.188 -1.854,2.271 -0.342,1.096 -0.25,2.18 0.238,2.908 1.611,1.584 2.257,4.447 1.482,6.57 z";
  var pathDataLittle1 ="m 1200.306,46.58 c -0.334,-0.211 -0.629,-0.465 -0.869,-0.754 -0.176,-0.213 -0.145,-0.527 0.068,-0.705 0.213,-0.176 0.527,-0.145 0.705,0.068 0.701,0.852 2.131,1.297 3.188,0.994 0.268,-0.076 0.543,0.078 0.619,0.344 0.076,0.266 -0.078,0.543 -0.344,0.619 -1.067,0.305 -2.377,0.059 -3.367,-0.566 z";
  var pathDataLittle2 = "m 1187.841,71.973 c -0.807,-0.51 -1.473,-1.281 -1.758,-2.129 -0.088,-0.262 0.053,-0.545 0.314,-0.633 0.26,-0.088 0.545,0.051 0.633,0.314 0.354,1.043 1.531,1.969 2.627,2.064 0.275,0.023 0.48,0.266 0.457,0.541 -0.025,0.275 -0.268,0.479 -0.541,0.455 -0.594,-0.048 -1.193,-0.273 -1.732,-0.612 z";
  var pathDataLittle3 = "m 1190.39,55.574 c -0.143,-0.088 -0.236,-0.248 -0.234,-0.428 0,-0.277 0.23,-0.498 0.508,-0.494 0.385,0.006 0.863,-0.299 1.021,-0.65 0.113,-0.252 0.41,-0.365 0.662,-0.25 0.25,0.109 0.363,0.408 0.25,0.66 -0.322,0.717 -1.158,1.25 -1.947,1.24 -0.096,-0.002 -0.184,-0.029 -0.26,-0.078 z";
  var pathDataLittle4 = "m 1198.808,70.957 c -0.172,-0.107 -0.268,-0.316 -0.223,-0.527 0.061,-0.271 0.324,-0.441 0.596,-0.383 0.73,0.156 1.713,-0.221 2.146,-0.826 0.16,-0.223 0.473,-0.279 0.697,-0.113 0.225,0.16 0.277,0.473 0.115,0.697 -0.662,0.924 -2.055,1.459 -3.17,1.219 -0.058,-0.012 -0.113,-0.036 -0.161,-0.067 z";

  this.myNavet = new Path(pathData);
  this.myNavet.fillColor = this.Color;

  var pathLittle1 = new Path(pathDataLittle1);
  navetPath.push(pathLittle1);
  
  var pathLittle2 = new Path(pathDataLittle2);
  navetPath.push(pathLittle2);
  
  var pathLittle3 = new Path(pathDataLittle3);
  navetPath.push(pathLittle3);
  
  var pathLittle4 = new Path(pathDataLittle4);
  navetPath.push(pathLittle4);


  this.navetItems = new CompoundPath({
    children: navetPath,
    fillColor : this.Color,
    strokeCap: 'round',
  });

  this.item = new Group({
    children: [this.myNavet , this.navetItems],
    transformContent: false,
    position: this.position
  });

  this.item.scale(2);
  this.item.rotate(this.rotation);
}

Navet.prototype = {
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
    for(var a=0; a<this.navetItems.children.length; a++){
      var itemXPos = this.navetItems.children[a].position.x;
      var itemYPos = this.navetItems.children[a].position.y;
      var itemXSpeed = Math.random() * 0.3 - 0.15;
      var itemYSpeed = Math.random() * 0.3 - 0.15;   
      this.navetItems.children[a].position.x+=itemXSpeed;
      this.navetItems.children[a].position.y+=itemYSpeed;
    }
    // var itemBoundsW = this.item.bounds.width;
    // var itemBoundsH = this.item.bounds.height;
    // console.log(itemBoundsW + " - " + itemBoundsH);
    // for(var a=0; a<this.navetItems.children.length; a++){
    //   var littleBoundsW = this.navetItems.children[a].bounds.width;
    //   var littleBoundsH = this.navetItems.children[a].bounds.height;
    //   console.log(littleBoundsW + " - " + littleBoundsH);
    //   var itemXPos = this.navetItems.children[a].position.x;
    //   var itemYPos = this.navetItems.children[a].position.y;
    //   var limitXHigh = itemXPos + 1;
    //   var limitXLow = itemXPos -1;
    //   var itemXSpeed = Math.random() * 1;
    //   var itemYSpeed = Math.random() * 1; 
    //   //console.log(this.navetItems.children[a]);
    //   if (this.navetItems.children[a].position.x > limitXHigh) {
    //     shrinkOrGrow = 0;
    //   } 
    //   else if (this.navetItems.children[a].position.x < limitXLow) {
    //     shrinkOrGrow = 1;
    //   }
    //   // check if the path need to go forward or bacward
    //   if (shrinkOrGrow == 1) {
    //     this.navetItems.children[a].position.x+=itemXSpeed;
    //     this.navetItems.children[a].position.y+=itemYSpeed;
    //   } else if (shrinkOrGrow == 0) {
    //     this.navetItems.children[a].position.x-=itemXSpeed;
    //     this.navetItems.children[a].position.y-=itemYSpeed; 
    //   }
    // }
  }
}

//--------------------- main ---------------------

var allNavet = [];
var number = 20;

for (var i = 0; i < number; i++) {
  var destinationX = Math.random() * 1 - 0.5;
  var destinationY = Math.random() * 1 - 0.5;
  var position = Point.random() * view.size;
  var rotation = Math.random() * 360;
  allNavet.push(new Navet(destinationX, destinationY, position, rotation));
}

function onFrame(event) {
  for (var i = 0, l = allNavet.length; i < l; i++) {
    allNavet[i].move(event, i);
    //allNavet[i].zumba(event, i);
  }
}
