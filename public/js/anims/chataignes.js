var center = view.center;
var width = view.size.width;
var height = view.size.height;

var Color = "#bd754b";

var path = new Path.Line({
  from: [0, 0],
  to: [20, 0],
  strokeColor: Color,
  strokeWidth: 2,
  strokeCap: 'square'
});

var pathHor = new Path.Line({
  from: [0, 0],
  to: [0, 20],
  strokeColor: Color,
  strokeWidth: 2,
  strokeCap: 'square'
});

var symbol = new Symbol(path);
var symbolHor = new Symbol(pathHor);

for(var x=width/20; x<width; x+=width/20){
  for(var y=height/20; y<height; y+=height/20){
    var position = new Point(x, y);
    var placed = symbol.place(position);
  }
}
for(var x=width/40; x<width; x+=width/20){
  for(var y=height/40; y<height; y+=height/20){
    var position = new Point(x, y);
    var placed = symbol.place(position);
  }
}

for(var x=width/40; x<width; x+=width/20){
  for(var y=height/20; y<height; y+=height/20){
    var position = new Point(x, y);
    var placed = symbolHor.place(position);
  }
}
for(var x=width/20; x<width; x+=width/20){
  for(var y=height/40; y<height; y+=height/20){
    var position = new Point(x, y);
    var placed = symbolHor.place(position);
  }
}

var items = project.activeLayer.children;

function onFrame(event) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var angle = Math.random() * 6 + 1;
    item.rotate(angle);
  }
}
