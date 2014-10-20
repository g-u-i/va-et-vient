var Rond=function(){
    this.radius=20;
    this.killFrag=false;
    this.path=new Path.Circle({
        center: Point.random() * view.size,
        radius:this.radius,
        fillColor: '#5DCEC8'
    });
    this.path.opacity = 0.7;
}

    Rond.prototype.teardown=function(){
        this.path.remove()
    };

    var ronds=[];
    var maxCount=10;
    var count=0;
    
    function onFrame(c){
        if(count==0){
            count=maxCount;
            addRonds()
        }
        else{
            count--
        }
        if(ronds.length>50){
                var b=ronds[0];
            if(b.killFrag&&b.radius<20){
                b.teardown();
                ronds.splice(0,1)
            }
            else{
                b.killFrag=true
            }
        }
    }

    function addRonds(){
        var a=view.center;
        a.x+=Math.random()*10-5;
        a.y+=Math.random()*10-5;
        var b=new Rond();
        b.position=a.clone();
        ronds.push(b)
    }

    function onResize(a){

    }








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
        
        


