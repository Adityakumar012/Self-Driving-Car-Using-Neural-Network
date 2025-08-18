const canvas=document.querySelector("#mainCanvas");
canvas.height=window.innerHeight;
canvas.width=500;
const ctx=canvas.getContext("2d");
const car=new Car(250,700,30,50);
car.draw(ctx);
animate();
function animate(){
    canvas.height=window.innerHeight;
    car.update();
    car.draw(ctx);
    requestAnimationFrame(animate);
}