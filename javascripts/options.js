let greenRay =1;
let redRay =1;
let carCount=1000;
let lanes=3;
let genaticRandomness=0.05;
let trafficProbablity=0.19;
let rayCount=20;
let rayRange=300;
let rayAngle=90;
let race=0;
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const label3 = document.getElementById("label3");
const label4 = document.getElementById("label4");
if (!localStorage.getItem("greenRay")) {
    option1.checked=true;
    greenRay=1;
}
else{
    greenRay=0;
}
option1.addEventListener("change", () => {
    if(option1.checked){
        localStorage.removeItem("greenRay");
    }
    else{
        localStorage.setItem("greenRay",1);
    }
    greenRay=option1.checked;
});
if (!localStorage.getItem("redRay")) {
    option2.checked=true;
    redRay=1;
}
else{
    redRay=0;
}
option2.addEventListener("change", () => {
    if(option2.checked){
        localStorage.removeItem("redRay");
    }
    else{
        localStorage.setItem("redRay",1);
    }
    redRay=option2.checked;
});
if (!localStorage.getItem("rayAngle")) {
    option3.value=90;
    rayAngle=90;
}
else{
    rayAngle=localStorage.getItem("rayAngle");
    option3.value=rayAngle;
    label3.textContent = `sensor angle ${rayAngle}`;
}
option3.addEventListener("change", () => {
    localStorage.setItem("rayAngle",option3.value);
    rayAngle=option3.value;
    location.reload();
});
if (!localStorage.getItem("rayRange")) {
    option4.value=300;
    rayRange=300;
}
else{
    rayRange=localStorage.getItem("rayRange");
    option4.value=rayRange;
    label4.textContent = `sensor Range ${rayRange}`;
}
option4.addEventListener("change", () => {
    localStorage.setItem("rayRange",option4.value);
    rayRange=option4.value;
    location.reload();
});