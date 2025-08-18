const canvas=document.querySelector("#mainCanvas");
canvas.height=window.innerHeight;
canvas.width=300;
const ctx=canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9,3);
const car=new Car(road.getLaneCenter(1),700,30,50);
car.draw(ctx);
animate();
function animate(){
    canvas.height=window.innerHeight;
    car.update();
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}