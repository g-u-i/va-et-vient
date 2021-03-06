var center = view.center;
var width = view.size.width;
var height = view.size.height;

// The amount of segment points we want to create:
//var amount = 5;
// The maximum height of the wave:
var height = 15;

function Salsifis(_sizeSal, _destination, _position, _amount, _dandineSpeed, _rotation, _speed){
  this.sizeSal = _sizeSal;
  this.destination = _destination;
  this.position = _position;
  this.amount = _amount;
  this.dandineSpeed = _dandineSpeed;
  var strength = Math.random() * 0.1;
  this.acceleration = new Point();
  this.vector = Point.random() * 2 - 1;
  this.maxSpeed = 10 + strength;
  this.rotation = _rotation;
  this.speed = _speed;
  //console.log(this.rotate);

  this.path = new Path({
    strokeColor: "#c99389",
    strokeWidth: 14,
    strokeCap: 'round'
  });


  for (var i =0; i <= this.amount; i++) {
    this.path.add(new Point(i / this.amount, 1) * 150);
  }
  this.path.position = this.position;
  this.path.scale(this.sizeSal);
  this.path.rotate(this.rotation)


}

Salsifis.prototype = {
  move: function(event, i){
    this.path.position.x += this.path.bounds.width / this.speed;

    // If the this.path has left the view on the right, move it back
    // to the left:
    if (this.path.bounds.left > view.size.width) {
      this.path.position.x = -this.path.bounds.width;
    }
  },
  moveVert: function(event, i){
    this.path.position.y += this.path.bounds.height / this.speed;

    // If the this.path has left the view on the right, move it back
    // to the left:
    if (this.path.bounds.top > view.size.height) {
      this.path.position.y = -this.path.bounds.height;
    }
  },
  dandine: function(event, i){
    // Loop through the segments of the path:
    for (var a = 0; a <= this.amount; a++) {
      var segment = this.path.segments[a];
      // A cylic value between -1 and 1
      var sinus = Math.sin(event.time * this.dandineSpeed + a);
      var cosinus = Math.cos(event.time * this.dandineSpeed + a);
      // Change the y position of the segment point:
      //segment.point.y = this.position.y + sinus * height + 100;
      segment.point.x = this.position.x + sinus * height +100;
    }
    this.path.smooth();
  }, 
  dandineHor: function(event, i){
    // Loop through the segments of the path:
    for (var a = 0; a <= this.amount; a++) {
      var segment = this.path.segments[a];
      // A cylic value between -1 and 1
      var sinus = Math.sin(event.time * this.dandineSpeed + a);
      var cosinus = Math.cos(event.time * this.dandineSpeed + a);
      // Change the y position of the segment point:
      segment.point.y = this.position.y + sinus * height + 100;
      //segment.point.x = this.position.x + sinus * height +100;
    }
    this.path.smooth();
  }, 
  dandineDiag: function(event, i){
    // Loop through the segments of the path:
    for (var a = 0; a <= this.amount; a++) {
      var segment = this.path.segments[a];
      // A cylic value between -1 and 1
      var sinus = Math.sin(event.time * this.dandineSpeed + a);
      var cosinus = Math.cos(event.time * this.dandineSpeed + a);
      // Change the y position of the segment point:
      //segment.point.y = this.position.y + sinus * height + 5;
      segment.point.x = this.position.x + sinus * 50 + 100;
    }
    this.path.smooth();
  },
}

//--------------------- main ---------------------

var allSalsifisVert = [];
var allSalsifisHor = [];
var allSalsifisDiag = [];

for (var i = 0; i < 15; i++) {
  var destination = Point.random() * 2;
  var position = Point.random() * view.size;
  var sizeSal = Math.random() * 0.3 + 0.5;
  var amount = 5;
  var dandineSpeed = Math.random() * 5 + 3;
  var rotation = 60;
  var speed = Math.random() * 40 + 120;
  allSalsifisVert.push(new Salsifis(sizeSal, destination, position, amount, dandineSpeed, rotation, speed));
}
for (var i = 0; i < 30; i++) {
  var destination = Point.random() * 2;
  var position = Point.random() * view.size;
  var sizeSal = Math.random() * 0.3 + 0.5;
  var amount = 5;
  var dandineSpeed = Math.random() * 5 + 3;
  var rotation = 0;
  var speed = Math.random() * 40 + 120;
  allSalsifisHor.push(new Salsifis(sizeSal, destination, position, amount, dandineSpeed, rotation, speed));
}

for (var i = 0; i < 8; i++) {
  var destination = Point.random() * 2;
  var position = Point.random() * view.size;
  var sizeSal = Math.random()  * 0.3 + 0.5;
  var amount = 5;
  var dandineSpeed = Math.random() * 5 + 3;
  var rotation = 45;
  var speed = Math.random() * 40 + 120;
  allSalsifisDiag.push(new Salsifis(sizeSal, destination, position, amount, dandineSpeed, rotation, speed));
}


function onFrame(event) {
  for (var i = 0, l = allSalsifisVert.length; i < l; i++) {
    allSalsifisVert[i].moveVert(event, i);
    allSalsifisVert[i].dandine(event,i);
  }
  for (var i = 0, l = allSalsifisHor.length; i < l; i++) {
    allSalsifisHor[i].move(event, i);
    allSalsifisHor[i].dandineHor(event,i);
  }
  for (var i = 0, l = allSalsifisDiag.length; i < l; i++) {
    allSalsifisDiag[i].moveVert(event, i);
    allSalsifisDiag[i].dandineDiag(event,i);
  }
}

//ALGUES
// // The amount of segment points we want to create:
// var amount = 10;

// // The maximum height of the wave:
// var height = 15;
// var width = 20;

// var Boid = Base.extend({
//     initialize: function(position, maxSpeed, maxForce) {
//         var strength = Math.random() * 0.1;
//         this.acceleration = new Point();
//         this.vector = Point.random() * 2 - 1;
//         this.position = position.clone();
//         this.radius = 30;
//         this.maxSpeed = maxSpeed + strength;
//         this.maxForce = maxForce + strength;
//         this.amount = strength * 10 + 10;
//         this.count = 0;
//         this.sizeSal = Math.random() * 1 + 0.5;
//         this.createItems();
//     },

//     run: function(boids) {
//         this.lastLoc = this.position.clone();
//         if (!groupTogether) {
//             this.flock(boids);
//         } else {
//             this.align(boids);
//         }
//         this.borders();
//         this.update();
//         this.calculateTail();
//         // this.moveHead();
//     },

//     calculateTail: function() {
//         var segments = this.path.segments,
//             shortSegments = this.shortPath.segments;
//         var speed = this.vector.length;
//         var pieceLength = 30 + speed / 2;
//         var point = this.position;
//         segments[0].point = shortSegments[0].point = point;
//         // Chain goes the other way than the movement
//         var lastVector = -this.vector;
//         for (var i = 1; i < this.amount; i++) {
//             var vector = segments[i].point - point;
//             this.count += speed * 4;
//             var wave = Math.sin((this.count + i * 3) / 400);
//             var sway = lastVector.rotate(90).normalize(wave);
//             point += lastVector.normalize(pieceLength) + sway;
//             segments[i].point = point;
//             if (i < 3)
//                 shortSegments[i].point = point;
//             lastVector = vector;
//         }
//         this.path.smooth();
//         //this.path.scale(this.sizeSal);
//         this.path.selected = true;
//     },

//     createItems: function() {

//         this.path = new Path({
//             strokeColor: '#000d9e',
//             strokeWidth: 10,
//             strokeCap: 'round'
//         });
//         for (var i = 0; i < this.amount; i++)
//             this.path.add(new Point());

//         this.shortPath = new Path({
//             strokeColor: '#000d9e',
//             strokeWidth: 10,
//             strokeCap: 'round'
//         });
//         console.log(Math.min(1,this.amount));
//         for (var i = 0; i < Math.min(3, this.amount); i++)
//             this.shortPath.add(new Point());
//     },


//     // We accumulate a new acceleration each time based on three rules
//     flock: function(boids) {
//         var separation = this.separate(boids) * 3;
//         var alignment = this.align(boids);
//         var cohesion = this.cohesion(boids);
//         this.acceleration += separation + alignment + cohesion;
//     },

//     update: function() {
//         // Update velocity
//         this.vector += this.acceleration;
//         // Limit speed (vector#limit?)
//         this.vector.length = Math.min(this.maxSpeed, this.vector.length);
//         this.position += this.vector;
//         // Reset acceleration to 0 each cycle
//         this.acceleration = new Point();
//     },

//     seek: function(target) {
//         this.acceleration += this.steer(target, false);
//     },

//     arrive: function(target) {
//         this.acceleration += this.steer(target, true);
//     },

//     borders: function() {
//         var vector = new Point();
//         var position = this.position;
//         var radius = this.radius;
//         var size = view.size;
//         if (position.x < -radius) vector.x = size.width + radius;
//         if (position.y < -radius) vector.y = size.height + radius;
//         if (position.x > size.width + radius) vector.x = -size.width -radius;
//         if (position.y > size.height + radius) vector.y = -size.height -radius;
//         if (!vector.isZero()) {
//             this.position += vector;
//             var segments = this.path.segments;
//             for (var i = 0; i < this.amount; i++) {
//                 segments[i].point += vector;
//             }
//         }
//     },

//     // A method that calculates a steering vector towards a target
//     // Takes a second argument, if true, it slows down as it approaches
//     // the target
//     steer: function(target, slowdown) {
//         var steer,
//             desired = target - this.position;
//         var distance = desired.length;
//         // Two options for desired vector magnitude
//         // (1 -- based on distance, 2 -- maxSpeed)
//         if (slowdown && distance < 100) {
//             // This damping is somewhat arbitrary:
//             desired.length = this.maxSpeed * (distance / 100);
//         } else {
//             desired.length = this.maxSpeed;
//         }
//         steer = desired - this.vector;
//         steer.length = Math.min(this.maxForce, steer.length);
//         return steer;
//     },

//     separate: function(boids) {
//         var desiredSeperation = 60;
//         var steer = new Point();
//         var count = 0;
//         // For every boid in the system, check if it's too close
//         for (var i = 0, l = boids.length; i < l; i++) {
//             var other = boids[i];
//             var vector = this.position - other.position;
//             var distance = vector.length;
//             if (distance > 0 && distance < desiredSeperation) {
//                 // Calculate vector pointing away from neighbor
//                 steer += vector.normalize(1 / distance);
//                 count++;
//             }
//         }
//         // Average -- divide by how many
//         if (count > 0)
//             steer /= count;
//         if (!steer.isZero()) {
//             // Implement Reynolds: Steering = Desired - Velocity
//             steer.length = this.maxSpeed;
//             steer -= this.vector;
//             steer.length = Math.min(steer.length, this.maxForce);
//         }
//         return steer;
//     },

//     // Alignment
//     // For every nearby boid in the system, calculate the average velocity
//     align: function(boids) {
//         var neighborDist = 25;
//         var steer = new Point();
//         var count = 0;
//         for (var i = 0, l = boids.length; i < l; i++) {
//             var other = boids[i];
//             var distance = this.position.getDistance(other.position);
//             if (distance > 0 && distance < neighborDist) {
//                 steer += other.vector;
//                 count++;
//             }
//         }

//         if (count > 0)
//             steer /= count;
//         if (!steer.isZero()) {
//             // Implement Reynolds: Steering = Desired - Velocity
//             steer.length = this.maxSpeed;
//             steer -= this.vector;
//             steer.length = Math.min(steer.length, this.maxForce);
//         }
//         return steer;
//     },

//     // Cohesion
//     // For the average location (i.e. center) of all nearby boids,
//     // calculate steering vector towards that location
//     cohesion: function(boids) {
//         var neighborDist = 100;
//         var sum = new Point();
//         var count = 0;
//         for (var i = 0, l = boids.length; i < l; i++) {
//             var other = boids[i];
//             var distance = this.position.getDistance(other.position);
//             if (distance > 0 && distance < neighborDist) {
//                 sum += other.position; // Add location
//                 count++;
//             }
//         }
//         if (count > 0) {
//             sum /= count;
//             // Steer towards the location
//             return this.steer(sum, false);
//         }
//         return sum;
//     }
// });

// var heartPath = new Path('M514.69629,624.70313c-7.10205,-27.02441 -17.2373,-52.39453 -30.40576,-76.10059c-13.17383,-23.70703 -38.65137,-60.52246 -76.44434,-110.45801c-27.71631,-36.64355 -44.78174,-59.89355 -51.19189,-69.74414c-10.5376,-16.02979 -18.15527,-30.74951 -22.84717,-44.14893c-4.69727,-13.39893 -7.04297,-26.97021 -7.04297,-40.71289c0,-25.42432 8.47119,-46.72559 25.42383,-63.90381c16.94775,-17.17871 37.90527,-25.76758 62.87354,-25.76758c25.19287,0 47.06885,8.93262 65.62158,26.79834c13.96826,13.28662 25.30615,33.10059 34.01318,59.4375c7.55859,-25.88037 18.20898,-45.57666 31.95215,-59.09424c19.00879,-18.32178 40.99707,-27.48535 65.96484,-27.48535c24.7373,0 45.69531,8.53564 62.87305,25.5957c17.17871,17.06592 25.76855,37.39551 25.76855,60.98389c0,20.61377 -5.04102,42.08691 -15.11719,64.41895c-10.08203,22.33203 -29.54687,51.59521 -58.40723,87.78271c-37.56738,47.41211 -64.93457,86.35352 -82.11328,116.8125c-13.51758,24.0498 -23.82422,49.24902 -30.9209,75.58594z');

// var boids = [];
// var groupTogether = false;
// var number = 40;
// // Add the boids:
// for (var i = 0; i < number; i++) {
//     var position = Point.random() * view.size;
//     boids.push(new Boid(position, 10, 0.05));
// }

// function onFrame(event) {
//     for (var i = 0, l = boids.length; i < l; i++) {
//         if (groupTogether) {
//             var length = ((i + event.count / 30) % l) / l * heartPath.length;
//             var point = heartPath.getPointAt(length);
//             if (point)
//                 boids[i].arrive(point);
//         }
//         boids[i].run(boids);
//     }

// }

// //FIN ALGUES