var center = view.center;
var width = view.size.width;
var height = view.size.height;
var counter = 0;
var started = false;
var sinusHeight = 10;
var randomNum;
var randomNumV;
var HorVer;

var Color = "#fabb52";
var items = project.activeLayer.children;

var xPos;
var yPos;
var vertical = [];
var horizontal = [];

function init(){
  drawGridLines(20, 10, paper.view.bounds);
}

var drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {
  var width_per_rectangle = boundingRect.width / num_rectangles_wide;
  var height_per_rectangle = boundingRect.height / num_rectangles_tall;
  for (var i = 0; i <= num_rectangles_wide; i++) {
      var xPos = boundingRect.left + i * width_per_rectangle;
      var topPoint = new Point(xPos, boundingRect.top);
      var bottomPoint = new Point(xPos, boundingRect.bottom);
      aLine = new Path.Line(topPoint, bottomPoint);
      aLine.strokeColor = Color;
      aLine.strokeWidth = 2;
      aLine.flatten(50);
      vertical.push(aLine);
  }
  for (var i = 0; i <= num_rectangles_tall; i++) {
      var yPos = boundingRect.top + i * height_per_rectangle;
      var leftPoint = new paper.Point(boundingRect.left, yPos);
      var rightPoint = new paper.Point(boundingRect.right, yPos);
      aLine = new paper.Path.Line(leftPoint, rightPoint);
      aLine.strokeColor = Color;
      aLine.strokeWidth = 2;
      aLine.flatten(50);
      horizontal.push(aLine);
    }
}

function onFrame(event) {
  counter++;
    if (counter%300===0){
      for(var a = 0; a < horizontal.length ; a ++){
        for (var i = 0; i < horizontal[a].segments.length; i++) {
          var segment = horizontal[a].segments[i];
          yPos = horizontal[a].position.y;
          segment.point.y = yPos;
        }
      }
      for(var a = 0; a < vertical.length ; a ++){
        for (var i = 0; i < vertical[a].segments.length; i++) {
          var segment = vertical[a].segments[i];
          xPos = vertical[a].position.x;
          segment.point.x = xPos;
        }
      }
      randomNum = Math.floor(Math.random() * horizontal.length);
      randomNumV = Math.floor(Math.random() * vertical.length);
      HorVer = Math.floor(Math.random() * 2);

    }
    if(HorVer == 0){
      if(randomNum >=0){
        for (var i = 0; i < horizontal[randomNum].segments.length; i++) {
          var segment = horizontal[randomNum].segments[i];
          yPos = horizontal[randomNum].position.y;
          // A cylic value between -1 and 1
          var sinus = Math.sin(event.time * 3 + i);
          
          // Change the y position of the segment point:
          segment.point.y = yPos + sinus * sinusHeight;
        }
      }
    }
    else{
      if(randomNumV >=0){
        for (var i = 0; i < vertical[randomNumV].segments.length; i++) {
          var segment = vertical[randomNumV].segments[i];
          xPos = vertical[randomNumV].position.x;
          // A cylic value between -1 and 1
          var sinus = Math.sin(event.time * 3 + i);
          
          // Change the y position of the segment point:
          segment.point.x = xPos + sinus * sinusHeight;
        }
      }
    }
}

init();


