class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
        this.controls=new Controls();
        this.speed=0;
        this.acceleration=0.1;
        this.friction=0.03;
        this.maxSpeed=4.5;
        this.angle=0;
        this.brakesfriction=0.1;
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
        //brakes
        if(this.controls.brakes){
            if(this.speed>0){
                if(this.speed>=this.brakesfriction){
                    this.speed-=this.brakesfriction;
                }
                else{
                    this.speed=0;
                }
            }
            if(this.speed<0){
                if(this.speed<=this.brakesfriction){
                    this.speed+=this.brakesfriction;
                }
                else{
                    this.speed=0;
                }
            }
        }
        // normal friction on car
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
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