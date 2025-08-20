class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
        this.speed=0;
        this.acceleration=0.15;
        this.friction=0.02;
        this.maxSpeed=4.5;
        this.steeringFriction=0.04;
        this.angle=0;
        this.brakesFriction=0.1;
        this.currentFriction=this.friction;
        this.controls=new Controls();
        this.sensor=new Sensor(this);
        this.points=[];
        this.crashed=false;
        this.#findPoints();
    }
    update(border){
        this.#findPoints();
        this.crashed=this.#checkCrash(border);
        if(!this.crashed){
            this.#move(); //car movement physics
            this.sensor.update(border);
        }
    }
    #findPoints(){
        this.points=[];
        const alpha=Math.atan2(this.width,this.height);
        const r=Math.hypot(this.width,this.height)/2;
        this.points.push({x:this.x+Math.sin(alpha-this.angle)*r,y:this.y-Math.cos(alpha-this.angle)*r});
        this.points.push({x:this.x+Math.sin(alpha+this.angle)*r,y:this.y+Math.cos(alpha+this.angle)*r});
        this.points.push({x:this.x-Math.sin(alpha-this.angle)*r,y:this.y+Math.cos(alpha-this.angle)*r});
        this.points.push({x:this.x-Math.sin(alpha+this.angle)*r,y:this.y-Math.cos(alpha+this.angle)*r});
    }
    #findIntersection(A,B,C,D){
        const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);   //line intersection logic
        const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
        const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
        if(bottom!=0){
            const t=tTop/bottom;
            const u=uTop/bottom;
            if(t>=0 && t<=1 && u>=0 && u<=1){
                return {
                    x:A.x+(B.x-A.x)*t,
                    y:A.y+(B.y-A.y)*t,
                    ratio:t
                }
            }
        }
        return null;
    }
    #checkCrash(border){
        for(let i=0;i<border.length;i++){
            if(this.#findPolyIntersection(this.points,border[i])){
                return true;
            }
        }
        return false;
    }
    #findPolyIntersection(poly1,poly2){
        for(let i=0;i<poly1.length;i++){
            for(let j=0;j<poly2.length;j++){
                if(this.#findIntersection(poly1[i],poly1[(i+1)%poly1.length],poly2[j],poly2[(j+1)%poly2.length])){
                    return true;
                }
            }
        }
        return false;
    }
    #move(){
        //controling speed of the car
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.backward){
            this.speed-=this.acceleration/2;
        }
        //max speed 
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        this.currentFriction=this.friction;
        // steering friction on car
        if(this.controls.left||this.controls.right){
            this.currentFriction=this.steeringFriction;
        }
        //brake friction on car
        if(this.controls.brakes){
            this.currentFriction=this.brakesFriction;
        }
        //friction effect
        if(Math.abs(this.speed)<this.currentFriction){
            this.speed=0;
        }
        if(this.speed>0){
            this.speed-=this.currentFriction;
        }
        if(this.speed<0){
            this.speed+=this.currentFriction;
        }
        //steering controls
        if(this.controls.left){
            if(this.speed>0){
                this.angle+=0.03;
            }
            else if(this.speed<0){
                this.angle-=0.03;
            }
        }
        if(this.controls.right){
            if(this.speed>0){
                this.angle-=0.03;
            }
            else if(this.speed<0){
                this.angle+=0.03;
            }
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
    draw(ctx){    
        this.sensor.draw(ctx);
        if(this.crashed){
            ctx.fillStyle="#ff0000ff";
        }
        else{
            ctx.fillStyle="black";
        }
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for(let i=1;i<this.points.length;i++){
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.fill();
    }
}