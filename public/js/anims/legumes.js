var center = view.center;
var width = view.size.width;
var height = view.size.height;
var shrinkOrGrow = 0;
var shrinkOrGrow2 = 1;

var Color = "#9bc550";

var path = new Path.Circle({
  center: [width/2, height/2],
  radius: 7,
  fillColor: Color,
});

var pathLittle = new Path.Circle({
  center: [width/2, height/2],
  radius: 3,
  fillColor: Color,
});

var symbol = new Symbol(path);
var symbolLittle = new Symbol(pathLittle);

for(var x=width/15; x<width; x+=width/15){
  for(var y=height/15; y<height; y+=height/15){
    var position = new Point(x, y);
    var placed = symbol.place(position);
  }
}
for(var x=width/30; x<width; x+=width/15){
  for(var y=height/30; y<height; y+=height/15){
    var position = new Point(x, y);
    var placed = symbol.place(position);
  }
}

for(var x=width/30; x<width; x+=width/15){
  for(var y=height/15; y<height; y+=height/15){
    var position = new Point(x, y);
    var placed = symbolLittle.place(position);
  }
}
for(var x=width/15; x<width; x+=width/15){
  for(var y=height/30; y<height; y+=height/15){
    var position = new Point(x, y);
    var placed = symbolLittle.place(position);
  }
}

var items = project.activeLayer.children;

function onFrame(event) {
  var scaling = 0.01;
  //FOR THE BIG CIRCLES
  //check the size of the circle
  if (path.scaling.x > 0.99) {
    shrinkOrGrow = 0;
  } else if (path.scaling.x < 0.31) {
      shrinkOrGrow = 1;
  }
  // check if the circle needs to grow or shrink
  if (shrinkOrGrow == 1) {
      path.scaling += scaling;
  } else if (shrinkOrGrow == 0) {
      path.scaling -= scaling;  
  }

  //FOR THE LITTLE CIRCLES
  if (pathLittle.scaling.x > 1.69) {
    shrinkOrGrow2 = 0;
  } else if (pathLittle.scaling.x < 1.01) {
      shrinkOrGrow2 = 1;
  }
  // check if the circle needs to grow or shrink
  if (shrinkOrGrow2 == 1) {
      pathLittle.scaling += scaling;
  } else if (shrinkOrGrow2 == 0) {
      pathLittle.scaling -= scaling;  
  }
}


