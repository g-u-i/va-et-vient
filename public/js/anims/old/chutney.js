

var center = view.center;
var width = view.size.width;
var height = view.size.height;
var number = 500;
var number2 = 30;

var rect = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68',
});

var rect2 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});


var rect3 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});

var rect4 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});

var rect5 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],    fillColor: '#0aff68'
});

var rect6 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});


var rect7 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});


var rect8 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});

var rect9 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});

var rect10 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});

var rect11 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});


var rect12 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});


var rect13 = new Path.Rectangle({
    from: [0, 0],
    to: [number2 * Math.random(), number * Math.random()],
    fillColor: '#0aff68'
});


var path = new Path.Line({
    from: [width / 2, 0],
    to: [width / 2, height],
});

var path2 = new Path.Line({
    from: [width / 3, 0],
    to: [width / 3, height],
});

var path3 = new Path.Line({
    from: [width / 4, 0],
    to: [width / 4, height],
});

var path4 = new Path.Line({
    from: [width / 5, 0],
    to: [width / 5, height],
});

var path5 = new Path.Line({
    from: [width / 6, 0],
    to: [width / 6, height],
});

var path6 = new Path.Line({
    from: [width / 7, 0],
    to: [width / 7, height],
});

var path7 = new Path.Line({
    from: [width / 8, 0],
    to: [width / 8, height],
});

var path8 = new Path.Line({
    from: [width / 1.8, 0],
    to: [width / 1.8, height],
});

var path9 = new Path.Line({
    from: [width / 0.5, 0],
    to: [width / 0.5, height],
});

var path10 = new Path.Line({
    from: [width / 1.5, 0],
    to: [width / 1.5, height],
});

var path11 = new Path.Line({
    from: [width / 1.2, 0],
    to: [width / 1.2, height],
});

var path12 = new Path.Line({
    from: [width / 0.8, 0],
    to: [width / 0.8, height],
});

var path13 = new Path.Line({
    from: [width / 0.2, 0],
    to: [width / 0.2, height],
});

rect.onFrame = function(event) {
    var offset = event.count * 6;
    var loc = path.getLocationAt(offset % path.length );
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 300;
    }
}

rect2.onFrame = function(event) {
    var offset = event.count * 2;
    var loc = path2.getLocationAt(offset % path2.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 500;
    }
}

rect3.onFrame = function(event) {
    var offset = event.count * 4;
    var loc = path3.getLocationAt(offset % path3.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 800;
    }
}

rect4.onFrame = function(event) {
    var offset = event.count;
    var loc = path4.getLocationAt(offset % path4.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 1000;
    }
}

rect5.onFrame = function(event) {
    var offset = event.count * 6;
    var loc = path5.getLocationAt(offset % path5.length );
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 1200;
    }
}

rect6.onFrame = function(event) {
    var offset = event.count * 2;
    var loc = path6.getLocationAt(offset % path6.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 500;
    }
}

rect7.onFrame = function(event) {
    var offset = event.count * 4;
    var loc = path7.getLocationAt(offset % path7.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 800;
    }
}

rect8.onFrame = function(event) {
    var offset = event.count;
    var loc = path8.getLocationAt(offset % path8.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 1000;
    }
}

rect9.onFrame = function(event) {
    var offset = event.count;
    var loc = path9.getLocationAt(offset % path9.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 1000;
    }
}

rect10.onFrame = function(event) {
    var offset = event.count * 6;
    var loc = path10.getLocationAt(offset % path10.length );
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 1200;
    }
}

rect11.onFrame = function(event) {
    var offset = event.count * 2;
    var loc = path11.getLocationAt(offset % path11.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 500;
    }
}

rect12.onFrame = function(event) {
    var offset = event.count * 4;
    var loc = path12.getLocationAt(offset % path12.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 800;
    }
}

rect13.onFrame = function(event) {
    var offset = event.count;
    var loc = path13.getLocationAt(offset % path13.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / Math.random() / 1000;
    }
}







// var Rond=function(){
//     this.radius=20;
//     this.killFrag=false;
//     this.path=new Path.Circle({
//         center: Point.random() * view.size,
//         radius:this.radius,
//         fillColor: '#5DCEC8'
//     });
//     this.path.opacity = 0.7;
// }

//     Rond.prototype.teardown=function(){
//         this.path.remove()
//     };

//     var ronds=[];
//     var maxCount=10;
//     var count=0;
    
//     function onFrame(c){
//         if(count==0){
//             count=maxCount;
//             addRonds()
//         }
//         else{
//             count--
//         }
//         if(ronds.length>50){
//                 var b=ronds[0];
//             if(b.killFrag&&b.radius<20){
//                 b.teardown();
//                 ronds.splice(0,1)
//             }
//             else{
//                 b.killFrag=true
//             }
//         }
//     }

//     function addRonds(){
//         var a=view.center;
//         a.x+=Math.random()*10-5;
//         a.y+=Math.random()*10-5;
//         var b=new Rond();
//         b.position=a.clone();
//         ronds.push(b)
//     }

//     function onResize(a){

//     }








// var count = 30;

//     project.currentStyle = {
//         fillColor: 'black',
//     };


// function createCircle(){
//     for (var i = 0; i < count; i++) {
//         // The center position is a random point in the view:
//         var center = Point.random() * view.size;
//         var scale = 3;
//         var path = new Shape.Circle(center, 5 * scale);
//         path.data.vector = new Point({
//             angle: Math.random() * 360,
//             length : scale * Math.random() / 5
//         });
//     }
// }


// function onFrame(event) {
//     if(event.count <= 50){
//         createCircle();
//     }
//     else{
//         // project.activeLayer.removeChildren();
//     }
// }
        
        


