var path = new Path.Line({
    from: [0, 0],
    to: [20, 0],
    strokeColor: '#F0655D',
    strokeWidth: 6,
    strokeCap: 'round'
});

var symbol = new Symbol(path);

for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
        var position = new Point(x, y) / 10 * view.size;
        var placed = symbol.place(position);
    }
}

var items = project.activeLayer.children;

function onFrame(event) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var angle = (item.position - event.point).angle / 6;
        item.rotate(angle);
    }

}