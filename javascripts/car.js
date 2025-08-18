class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
        this.controls=new Controls();
        this.speed=0;
        this.acceleration=0.15;
        this.friction=0.02;
        this.maxSpeed=4.5;
        this.steeringFriction=0.04;
        this.angle=0;
        this.brakesFriction=0.1;
        this.currentFriction=this.friction;
    }
    update(){
        this.#move(); //car movement physics
    }
    #move(){
        //controling speed of the car
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.backward){
            this.speed-=this.acceleration;
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
        ctx.save();                  //draw methord
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        ctx.fill();
        ctx.restore();
    }
}