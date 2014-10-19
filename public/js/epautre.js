


var center = view.center;
var path = new Path();



path.fillColor = '#F88721';
path.add(new Point(center.x, center.y - 350));
path.add(new Point(center.x - 300, center.y + 200));
path.add(new Point(center.x + 300, center.y + 200));

path.closed = true;

function onFrame(event) {
	// Each frame, rotate the path by 3 degrees:
	path.rotate(0.1);
}