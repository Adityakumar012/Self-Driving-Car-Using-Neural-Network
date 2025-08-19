class Road{
    constructor(x,width,lanes=3){
        this.x=x;
        this.width=width;
        this.lanes=lanes;
        this.left=x-width/2;
        this.right=x+width/2;
        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;
        this.border=[[{y:this.top,x:this.left},{y:this.bottom,x:this.left}],[{y:this.top,x:this.right},{y:this.bottom,x:this.right}]];
    }
    getLaneCenter(index){
        const laneWidth=this.width/this.lanes;
        index=Math.min(index,this.lanes-1);
        index=Math.max(index,0);
        return this.left+laneWidth*index+laneWidth/2;
    }
    draw(ctx){
        ctx.lineWidth=10;
        ctx.strokeStyle="white";
        this.border.forEach(element => {
            ctx.beginPath();
            ctx.moveTo(element[0].x,element[0].y);
            ctx.lineTo(element[1].x,element[1].y);
            ctx.stroke();
        });
        for(let i=1;i<this.lanes;i++){
            const xValue=this.left+(this.right-this.left)*(i/this.lanes);
            ctx.setLineDash([30,30]);
            ctx.beginPath();
            ctx.moveTo(xValue,this.top);
            ctx.lineTo(xValue,this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }
}