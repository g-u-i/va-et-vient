
var center = view.center;
var amount = 10;
var colors = ['#05BAA3', '#D2FFF8', '#05BAA3', '#D2FFF8'];
var width = view.size.width;
var height = view.size.height;

for (var i = 0; i < amount; i++) {
    var rect = new Rectangle([0, 0], [20, 20]);
    rect.center = width / 8;
    var path = new Path.Rectangle(rect, 8);
    path.fillColor = colors[i % 4];
    var radius = (1 - i / amount) * 20;
    path.scale(radius);
}


var children = project.activeLayer.children;
var destination = Point.random() * view.size;

function onFrame(event) {
    for (var i = 0, l = children.length; i < l; i++) {
        var item = children[i];        
        var vector = destination - item.position;
        item.position += vector / 100;
        if (vector.length < 5) {
            destination = Point.random() * view.size;
        }
        var delta = (destination - item.position) / (i + 100);
        item.rotate(Math.sin((event.count + i) / 100) * 5);
        if (delta.length > 0.1)
            item.position += delta;
    }
}