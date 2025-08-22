class Sensor{
    constructor(car){
        this.car=car;
        this.sensorCount=rayCount;
        this.sensorRange=rayRange;
        this.sensorAngle=(Math.PI/180)*rayAngle;
        this.sensor=[];
        this.intersection=[];
    }
    update(border,traffic){
        this.#findSensorLine();
        this.intersection=[];
        for(let i=0;i<this.sensor.length;i++){
            let ratio=1;
            let x=this.sensor[i][1].x;
            let y=this.sensor[i][1].y;
            for(let j=0;j<border.length;j++){
                const result=this.#findIntersection(this.sensor[i][0],this.sensor[i][1],border[j][0],border[j][1]);
                if(result!=null){
                    if(ratio>result.ratio){
                        ratio=result.ratio;
                        x=result.x;
                        y=result.y;
                    }
                }
            }
            for(let j=0;j<traffic.length;j++){
                for(let l=0;l<traffic[j].points.length;l++){
                    const result=this.#findIntersection(this.sensor[i][0],this.sensor[i][1],traffic[j].points[l],traffic[j].points[(l+1)%traffic[j].points.length]);
                    if(result!=null){
                        if(ratio>result.ratio){
                            ratio=result.ratio;
                            x=result.x;
                            y=result.y;
                        }
                    }
                }
            }
            this.intersection.push({x:x,y:y,ratio:ratio});
        }
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
    #findSensorLine(){
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
        for(let i=0;i<this.sensor.length;i++){
                ctx.lineWidth=3;
                ctx.shadowBlur = 0;
                ctx.strokeStyle="#ff0000ff";
                if(redRay){
                    ctx.beginPath();
                    ctx.moveTo(this.intersection[i].x,this.intersection[i].y);
                    ctx.lineTo(this.sensor[i][1].x,this.sensor[i][1].y);
                    ctx.stroke();
                }
                ctx.shadowColor = "#000000ff";
                ctx.shadowBlur = 2;
                ctx.strokeStyle="#00ff1eff";
                if(greenRay){
                    ctx.beginPath();
                    ctx.moveTo(this.sensor[i][0].x,this.sensor[i][0].y);
                    ctx.lineTo(this.intersection[i].x,this.intersection[i].y);
                    ctx.stroke();
                }
        }
    }
}