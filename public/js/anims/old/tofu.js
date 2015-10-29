

var center = view.center;
var width = view.size.width;

/* TESTS RONDS */
    // var circle = new Shape.Circle({
    //     center: center,
    //     radius: 80,
    //     fillColor: '#F7C352'
    // });

    // var circle2 = new Shape.Circle({
    //     center: center,
    //     radius: 80,
    //     fillColor: '#F7C352'
    // });

    // var circle3 = new Shape.Circle({
    //     center: center,
    //     radius: 80,
    //     fillColor: '#F7C352'
    // });

    // var circle4 = new Shape.Circle({
    //     center: center,
    //     radius: 80,
    //     fillColor: '#F7C352'
    // });


    // var path = new Path.Circle({
    //     center: center,
    //     radius: width / 6,
    // });


    // circle.onFrame = function(event) {
    //     var offset = event.count * 6;
    //     var loc = path.getLocationAt(offset % path.length );
    //     if (loc) {
    //         this.position = loc.point;
    //         this.rotation = loc.tangent.angle;
    //     }
    // }

    // circle2.onFrame = function(event) {
    //     var offset = event.count * 2;
    //     var loc = path.getLocationAt(offset % path.length);
    //     if (loc) {
    //         this.position = loc.point;
    //         this.rotation = loc.tangent.angle;
    //     }
    // }

    // circle3.onFrame = function(event) {
    //     var offset = event.count * 4;
    //     var loc = path.getLocationAt(offset % path.length);
    //     if (loc) {
    //         this.position = loc.point;
    //         this.rotation = loc.tangent.angle;
    //     }
    // }

    // circle4.onFrame = function(event) {
    //     var offset = event.count;
    //     var loc = path.getLocationAt(offset % path.length);
    //     if (loc) {
    //         this.position = loc.point;
    //         this.rotation = loc.tangent.angle;
    //     }
    // }
/*FIN TESTS RONDS*/

var rect = new Path.RegularPolygon({
    sides: 6,
    radius:70,
    fillColor: '#F7C352'
});

var rect2 = new Path.RegularPolygon({
    sides: 6,
    radius:70,
    fillColor: '#F7C352'
});


var rect3 = new Path.RegularPolygon({
    sides: 6,
    radius:70,
    fillColor: '#F7C352'
});


var rect4 = new Path.RegularPolygon({
    sides: 6,
    radius:70,
    fillColor: '#F7C352'
});


var path = new Path.Circle({
    center: center,
    radius: width / 6,
});

rect.blendMode = 'multiply';
rect2.blendMode = 'multiply';
rect3.blendMode = 'multiply';
rect4.blendMode = 'multiply';

rect.onFrame = function(event) {
    var offset = event.count * 6;
    var loc = path.getLocationAt(offset % path.length );
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / 100;
    }
}

rect2.onFrame = function(event) {
    var offset = event.count * 2;
    var loc = path.getLocationAt(offset % path.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / 70;
    }
}

rect3.onFrame = function(event) {
    var offset = event.count * 4;
    var loc = path.getLocationAt(offset % path.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / 150;
    }
}

rect4.onFrame = function(event) {
    var offset = event.count;
    var loc = path.getLocationAt(offset % path.length);
    if (loc) {
        this.position = loc.point;
        this.rotation = loc.tangent.angle / 50;
    }
}




