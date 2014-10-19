var Sabo=function(){
	this.position= new Point();
	this.velocity=new Point();
	this.force=new Point();
	this.tRadius=Math.pow(Math.random()*5,3)+20;
	this.radius=1;
	this.radiusVelocity=0;
	this.radiusFriction=0.2;
	this.friction=0.8;
	this.killFrag=false;
	this.path=new Path.Circle({
		center:view.center,
		radius:this.radius,
		fillColor:"green"
	});
	
	var a=0;
	this.path.fillColor=new Color(a,a,a)};
	
	Sabo.prototype.updateForce=function(){
		if(this.killFrag){
			this.tRadius=1
		}

	var e=new Point();
	for(var c=0; c<sabos.length; c++){
		var h=sabos[c];
		if(h==this){
			continue
		}
		var b=h.position-this.position;
		var g=b.length;
		if(g<h.radius+this.radius){
			var a=Math.atan2(b.y,b.x);
			var d=(h.radius+this.radius)-g;
			e.x-=Math.cos(a)*d*0.04;
			e.y-=Math.sin(a)*d*0.04}}this.force+=e;
			var b=view.center-this.position;
			var g=b.length;
			var a=Math.atan2(b.y,b.x);
			var d=0-g;
			e.x-=Math.cos(a)*d*0.001;
			e.y-=Math.sin(a)*d*0.001;
			this.force+=e};


	Sabo.prototype.updataPosition=function(){
		this.velocity+=this.force;
		this.velocity*=this.friction;
		this.position+=this.velocity/5;
		this.force=new Point();
		var a=(this.tRadius-this.radius)*0.2;
		this.radiusVelocity+=a;
		this.radiusVelocity*=this.radiusFriction;
		this.radius+=this.radiusVelocity
	};

	Sabo.prototype.updatePath=function(){
		if(this.path){
			this.path.remove()
		}
		this.path=new Path.Circle({
			center:view.center,
			radius:20,
			fillColor:"#F8AEAF"
		});
		this.path.position=this.position
	};

	Sabo.prototype.teardown=function(){
		this.path.remove()
	};

	var sabos=[];
	var maxCount=10;
	var count=0;
	
	function onFrame(c){
		if(count==0){
			count=maxCount;
			addSabo()
		}
		else{
			count--
		}
		for(var a=0; a<sabos.length; a++){
			sabos[a].updateForce();
			sabos[a].updataPosition()
		}
		for(var a=0; a<sabos.length; a++){
			sabos[a].updateForce();
			sabos[a].updataPosition();
			sabos[a].updatePath()
		}
		if(sabos.length>50){
				var b=sabos[0];
			if(b.killFrag&&b.radius<20){
				b.teardown();
				sabos.splice(0,1)
			}
			else{
				b.killFrag=true
			}
		}
	}

	function addSabo(){
		var a=view.center;
		a.x+=Math.random()*10-5;
		a.y+=Math.random()*10-5;
		var b=new Sabo();
		b.position=a.clone();
		sabos.push(b)
	}

	function onResize(a){

	}
