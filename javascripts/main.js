const canvas=document.querySelector("#mainCanvas");
canvas.height=window.innerHeight;
canvas.width=300;
const ctx=canvas.getContext("2d");

const road=new Road(canvas.width/2,canvas.width*0.9,lanes);
let n=carCount;
const cars=genrateCars(n);
let best=0;
const traffic=[
    // new Car(road.getLaneCenter(0),400,260,50,0),
    // new Car(road.getLaneCenter(2),-300,260,50,0),
];
function save(){
    localStorage.setItem("bestneural",JSON.stringify(cars[best].neuralNetwork));
    document.body.style.backgroundColor="red";
    setTimeout(()=>{
        document.body.style.backgroundColor="rgb(47, 47, 47)";
    },100)
}
function reset(){
    localStorage.removeItem("bestneural");
    document.body.style.backgroundColor="red";
    setTimeout(()=>{
        document.body.style.backgroundColor="rgb(47, 47, 47)";
    },100)
}   

function genrateCars(n){
    const c=[];
    if(localStorage.getItem("bestneural")){
        for(let i=0;i<n;i++){
            if(i==1){
                if(race){c.push(new Car(road.getLaneCenter(1),canvas.height*0.8,30,50,1));}
                else{
                    c.push(new Car(road.getLaneCenter(1),canvas.height*0.8,30,50,2));
                }
            }
            else{
                c.push(new Car(road.getLaneCenter(1),canvas.height*0.8,30,50,2));
            }
            const net=JSON.parse(localStorage.getItem("bestneural"));
            if(i==0){
                c[i].neuralNetwork=net;
            }
            else if(i==1){
                if(!race)c[i].neuralNetwork=genaticrandom(net,genaticRandomness);
            }
            else{
                c[i].neuralNetwork=genaticrandom(net,genaticRandomness);
            }
        }
    }
    else{
        for(let i=0;i<n;i++){
            c.push(new Car(road.getLaneCenter(1),canvas.height*0.8,30,50,2));
        }
    }
    return c;
}
for(let i=0;i<n;i++){
    cars[i].draw(ctx);
}
function genrateTraffic(x){
    let y1=cars[best].y;
    if(race){
        y1=cars[1].y;
    }
    y1-=1400;
    let a=Math.random();
    if(a<x){
        traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*lanes)),y1,30,50,0));
        traffic[traffic.length-1].speed=maxSpeed;
    }
}
const fps=document.querySelector("#fps");
let count=0;
let last=performance.now();
animate();
function animate(){
    alive=0;
    for(let i=0;i<traffic.length;i++){
        traffic[i].update([],[]);
    }
    for(let i=0;i<n;i++){
        cars[i].update(road.border,traffic);
        if(cars[i].ai&&cars[i].y<cars[best].y){
            best=i;
        }
        if(!cars[i].crashed)alive++;
    }
    canvas.height=window.innerHeight;
    ctx.save();
    let cameraY=0;
    if(best!=-1){
        animateControl(cars[best].controls)
    }
    if(race){
        ctx.translate(0,-cars[1].y+canvas.height*0.7);
        cameraY=cars[1].y;
    }
    else{
        ctx.translate(0,-cars[best].y+canvas.height*0.7);
        cameraY=cars[best].y;
    }
    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,0,cameraY);
    }
    for(let i=0;i<n;i++){
        ctx.globalAlpha=alpha;
        if((i==best))ctx.globalAlpha=1;
        cars[i].draw(ctx,(i==best),cameraY);
    }
    if(race){
        if(Math.abs(Math.floor(cars[1].y))%groupDist<=group)genrateTraffic(trafficProbablity);

    }else{
        if(Math.abs(Math.floor(cars[best].y))%groupDist<=group)genrateTraffic(trafficProbablity);
    }
    updateNeural(cars[best].neuralNetwork.levels,cars[best].controls);
    count++;
    ctx.globalAlpha=1;
    ctx.restore();
    requestAnimationFrame(animate);
    let curr=performance.now();
    if(curr-last>=1000){
        fps.textContent = "FPS: " + count;
        count=0;
        last=curr;
    }
}