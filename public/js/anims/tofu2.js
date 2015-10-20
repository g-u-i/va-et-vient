var center = view.center;
var width = view.size.width;
var height = view.size.height;
var shrinkOrGrow = 0;
var shrinkOrGrow2 = 1;

var Color = "#6d9fd5";

var path = new Path.Circle({
  center: [width/2, height/2],
  radius: 12,
  fillColor: Color,
});

path.removeSegment(3);

var pathLittle = new Path.Line({
  from: new Point(0, 0),
  to: new Point(23, 0),
  strokeColor: Color,
  strokeWidth: 3,
});

var symbol = new Symbol(path);
var symbolLittle = new Symbol(pathLittle);

for(var x=width/10; x<width; x+=width/10){
  for(var y=height/10; y<height; y+=height/10){
    var position = new Point(x, y);
    var placed = symbol.place(position);
  }
}
for(var x=width/20; x<width; x+=width/10){
  for(var y=height/20; y<height; y+=height/10){
    var position = new Point(x, y);
    var placed = symbol.place(position);
  }
}

for(var x=width/20; x<width; x+=width/10){
  for(var y=height/10; y<height; y+=height/10){
    var position = new Point(x, y);
    var placed = symbolLittle.place(position);
  }
}
for(var x=width/10; x<width; x+=width/10){
  for(var y=height/20; y<height; y+=height/10){
    var position = new Point(x, y);
    var placed = symbolLittle.place(position);
  }
}

var items = project.activeLayer.children;

function onFrame(event) {
  // var scaling = 0.01;
  // //FOR THE BIG CIRCLES
  // //check the size of the circle
  // if (path.scaling.x > 0.99) {
  //   shrinkOrGrow = 0;
  // } else if (path.scaling.x < 0.31) {
  //     shrinkOrGrow = 1;
  // }
  // // check if the circle needs to grow or shrink
  // if (shrinkOrGrow == 1) {
  //     path.scaling += scaling;
  // } else if (shrinkOrGrow == 0) {
  //     path.scaling -= scaling;  
  // }

  // //FOR THE LITTLE CIRCLES
  // if (pathLittle.scaling.x > 1.69) {
  //   shrinkOrGrow2 = 0;
  // } else if (pathLittle.scaling.x < 1.01) {
  //     shrinkOrGrow2 = 1;
  // }
  // // check if the circle needs to grow or shrink
  // if (shrinkOrGrow2 == 1) {
  //     pathLittle.scaling += scaling;
  // } else if (shrinkOrGrow2 == 0) {
  //     pathLittle.scaling -= scaling;  
  // }
}


