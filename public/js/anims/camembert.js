// this code is created by : Dionysis Zindros : http://www.dionyziz.com

(function(window, $,  undefined) {
    var ctx = null;
    var W = 130, H = 100;
    var NUM_WAVES = 7;
    // var BLUR_RADIUS = 30;
    var THETA_RESOLUTION = 0.05;
    var cx = W / 2, cy = H / 2;
    var r0 = 0.6;
    var waves = [];
    var t = new Date() | 0;

    window.requestAnimationFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    function Wave() {
        this.maxAlpha = Math.random() / 20;
        this.alpha = 0;
        this.omega = Math.floor( Math.random() * 10 );
        this.phi = Math.random() * 2 * Math.PI;
        this.deltaPhi = ( 0.5 - Math.random() ) / 50;
        this.life = 0;
        this.lifeTime = 1000 + Math.random() * 1000;
    }

    function generateWaves() {
        for ( var i = 0; i < NUM_WAVES; ++i ) {
            waves[ i ] = new Wave();
        }
    }

    function transformDistance( r ) { return 65 * r; }

    function polarFunction( theta ) {
        var r = r0;

        for ( var i = 0; i < NUM_WAVES; ++i ) {
            var wave = waves[ i ];
            r += wave.alpha * Math.sin( wave.omega * theta + wave.phi );
        }
        return r;
    }
    function integrate( dt ) {
        for ( var i = 0; i < NUM_WAVES; ++i ) {
            var wave = waves[ i ];
            waves[ i ].phi += dt * wave.deltaPhi;
            waves[ i ].alpha = wave.maxAlpha * Math.sin( Math.PI * wave.life / wave.lifeTime );

            waves[ i ].life += dt;
            if ( wave.life > wave.lifeTime ) {
                waves[ i ] = new Wave();
            }
        }
    }

    function drawFrame() {
        ctx.clearRect( 0, 0, W, H );

        ctx.beginPath();
        for ( var theta = 0; theta < 2 * Math.PI; theta += THETA_RESOLUTION ) {
            var r = transformDistance( polarFunction( theta ) );
            ctx.lineTo( cx + r * Math.cos( theta ), cy + r * Math.sin( theta ) );
        }
        ctx.fill();
    }

    function mainLoop() {
        var dt = ( new Date() | 0 ) - t;
        t = new Date() | 0;

        integrate( dt );      
        drawFrame();
        requestAnimationFrame( mainLoop );
    }
    
    $(function initCanvas() {
        if(Modernizr.canvas) {
            ctx =  document.getElementById('camembert' ).getContext( '2d' );
            // ctx.shadowColor = 'black';
         //   ctx.shadowOffsetX = 0;
          //  ctx.shadowOffsetY = 0;
            // ctx.shadowBlur = BLUR_RADIUS;
            ctx.fillStyle = '#0ad8ff';

           generateWaves();
            mainLoop();
        } else {
        }
    });
})(window, jQuery);



// var center = view.center;
// var amount = 20;
// var width = view.size.width;
// var height = view.size.height;
// // var colors = ['green', 'green', 'green', 'green'];

// for (var i = 0; i < amount; i++) {
//     var rect = new Rectangle([0, 0], [200, 200]);
//     rect.center = width / 8;
//     var path = new Path.Rectangle(rect, 10);
//     path.strokeColor = "#17866D";

//     var rect2 = new Rectangle([0, 0], [150, 150]);
//     rect.center = width / 8;
//     var path2 = new Path.Rectangle(rect2, 10);
//     path2.strokeColor = "#17866D";

//     var rect3 = new Rectangle([0, 0], [100, 100]);
//     rect.center = width / 8;
//     var path3 = new Path.Rectangle(rect3, 10);
//     path3.strokeColor = "#17866D";
// }


// var children = project.activeLayer.children;
// var destination = Point.random() * view.size;

// function onFrame(event) {
//     for (var i = 0, l = children.length; i < l; i++) {
//         var item = children[i];        
//         var vector = destination - item.position;
//         //vitesse de déplacement
//         // item.position += vector / 50;
//         // if (vector.length < 5) {
//         //     destination = Point.random() * view.size;
//         // }
//         var delta = (destination - item.position) / (i + 100);
//         item.rotate(Math.sin((event.count + i) / 100) * 10);
//         if (delta.length > 0.1)
//             item.position += delta;
//         }
// }