class Sensor{
    constructor(car){
        this.car=car;
        this.sensorCount=5;
        this.sensorRange=200;
        this.sensorAngle=Math.PI/2;
        this.sensor=[];
    }
    update(){
        this.sensor=[];
        for(let i=0;i<this.sensorCount;i++){
            let angle=0;
            if(this.sensorCount===1){
                angle=this.car.angle;
            }
            else{
                angle=-this.sensorAngle/2+(i)*(this.sensorAngle/(this.sensorCount-1))+this.car.angle;
            }
            this.sensor.push([{x:this.car.x,y:this.car.y},{x:this.car.x-this.sensorRange*(Math.sin(angle)),y:this.car.y-this.sensorRange*(Math.cos(angle))}]);
        }
    }
    draw(ctx){
        this.sensor.forEach( element =>{
            ctx.lineWidth=2;
            ctx.strokeStyle="red";
            ctx.beginPath();
            ctx.moveTo(element[0].x,element[0].y);
            ctx.lineTo(element[1].x,element[1].y);
            ctx.stroke();
        });
    }
}