var count = 30;

    project.currentStyle = {
        fillColor: 'black',
    };


function createCircle(){
    for (var i = 0; i < count; i++) {
        // The center position is a random point in the view:
        var center = Point.random() * view.size;
        var scale = 3;
        var path = new Shape.Circle(center, 5 * scale);
        path.data.vector = new Point({
            angle: Math.random() * 360,
            length : scale * Math.random() / 5
        });
    }
}


function onFrame(event) {
    if(event.count <= 50){
        createCircle();
    }
    else{
        // project.activeLayer.removeChildren();
    }
}


// var path = new Path.Circle({
//     center: view.center,
//     radius: 20,
//     fillColor: 'red'
// });

// var symbol = new Symbol(path);


// function onFrame(event) {
//     console.log(event.count);
//     if(event.count <= 5){
//         // Place 30 symbols in the document:
//         for (var i = 0; i < 150; i++) {
//         var item = symbol.place(Point.random() * view.size);
// }
//     }
//     else{
//         // project.activeLayer.removeChildren();
//     }
// }
        
        


