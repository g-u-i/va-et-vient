var center = view.center;
var width = view.size.width;
var height = view.size.height;
var shrinkOrGrow = 0;
var shrinkOrGrow2 = 1;
var Yheight = 30;

var Color = "#6d9fd5";

var pathData = "m 67.73,34.798 c 0,-5.711 -4.629,-10.342 -10.342,-10.342 -5.709,0 -10.34,4.631 -10.34,10.342 v 1.793 H 67.73 v -1.793 z";

var path = new Path(pathData);
path.fillColor = Color;
path.scale(1.2);

var pathLittle = new Path(pathData);
pathLittle.fillColor = Color;
pathLittle.segments[1].point.y = Yheight;

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
//console.log(path.segments[1].point.y);

function onFrame(event) {
  console.log(path.segments[1].point.y);
  var increase = 0.1;
  var scaling = 0.004;
  //FOR THE BIG CIRCLES
  //check the size of the circle
  if (pathLittle.segments[1].point.y > 0) {
    shrinkOrGrow = 0;
  } else if (pathLittle.segments[1].point.y < -13) {
      shrinkOrGrow = 1;
  }
  // check if the circle needs to grow or shrink
  if (shrinkOrGrow == 1) {
      pathLittle.segments[1].point.y += increase;
       pathLittle.scaling -= scaling;
  } else if (shrinkOrGrow == 0) {
      pathLittle.segments[1].point.y -= increase;  
      pathLittle.scaling += scaling;
  }

  if (path.segments[1].point.y > 3) {
    shrinkOrGrow2 = 0;
  } else if (path.segments[1].point.y < -10) {
      shrinkOrGrow2 = 1;
  }
  // check if the circle needs to grow2 or shrink
  if (shrinkOrGrow2 == 1) {
      path.segments[1].point.y += increase;
       path.scaling -= scaling;
  } else if (shrinkOrGrow2 == 0) {
      path.segments[1].point.y -= increase;  
      path.scaling += scaling;
  }

}


