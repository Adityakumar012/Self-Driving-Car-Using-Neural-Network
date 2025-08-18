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
        for(let i=0;i<=this.lanes;i++){
            const xValue=this.left+(this.right-this.left)*(i/this.lanes);
            if(i>0&&i<this.lanes){
                ctx.setLineDash([30,30]);
            }
            else{
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(xValue,this.top);
            ctx.lineTo(xValue,this.bottom);
            ctx.stroke();
        }
    }
}