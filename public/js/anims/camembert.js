
var center = view.center;
var amount = 20;
var width = view.size.width;
var height = view.size.height;
// var colors = ['green', 'green', 'green', 'green'];

for (var i = 0; i < amount; i++) {
    var rect = new Rectangle([0, 0], [200, 200]);
    rect.center = width / 8;
    var path = new Path.Rectangle(rect, 10);
    path.strokeColor = "#17866D";

    var rect2 = new Rectangle([0, 0], [150, 150]);
    rect.center = width / 8;
    var path2 = new Path.Rectangle(rect2, 10);
    path2.strokeColor = "#17866D";

    var rect3 = new Rectangle([0, 0], [100, 100]);
    rect.center = width / 8;
    var path3 = new Path.Rectangle(rect3, 10);
    path3.strokeColor = "#17866D";
}


var children = project.activeLayer.children;
var destination = Point.random() * view.size;

function onFrame(event) {
    for (var i = 0, l = children.length; i < l; i++) {
        var item = children[i];        
        var vector = destination - item.position;
        //vitesse de déplacement
        // item.position += vector / 50;
        // if (vector.length < 5) {
        //     destination = Point.random() * view.size;
        // }
        var delta = (destination - item.position) / (i + 100);
        item.rotate(Math.sin((event.count + i) / 100) * 10);
        if (delta.length > 0.1)
            item.position += delta;
        }
}