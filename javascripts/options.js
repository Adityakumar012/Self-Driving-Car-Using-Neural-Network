let greenRay =1;
let redRay =1;
let carCount=50;
let lanes=3;
let genaticRandomness=0.1;
let trafficProbablity=0.19;
let rayCount=20;
let rayRange=300;
let rayAngle=90;
let alpha=0.2;
let race=0;
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const option5 = document.getElementById("option5");
const option6 = document.getElementById("option6");
const option7 = document.getElementById("option7");
const option8 = document.getElementById("option8");
const label4 = document.getElementById("label4");
const label5 = document.getElementById("label5");
const label6 = document.getElementById("label6");
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
    label4.textContent = `sensor Range ${rayRange}`;
});
if (!localStorage.getItem("rayAngle")) {
    option5.value=90;
    rayAngle=90;
}
else{
    rayAngle=localStorage.getItem("rayAngle");
    option5.value=rayAngle;
    label5.textContent = `sensor angle ${rayAngle}`;
}
option5.addEventListener("change", () => {
    localStorage.setItem("rayAngle",option5.value);
    rayAngle=option5.value;
    label5.textContent = `sensor angle ${rayAngle}`;
});
if (!localStorage.getItem("alpha")) {
    option6.value=0.2;
    alpha=0.2;
}
else{
    alpha=localStorage.getItem("alpha");
    option6.value=alpha;
    label6.textContent = `transparency ${alpha}`;
}
option6.addEventListener("change", () => {
    localStorage.setItem("alpha",option6.value);
    alpha=option6.value;
    label6.textContent = `transparency ${alpha}`;
});
if (!localStorage.getItem("carCount")) {
    option7.value=50;
    carCount=50;
}
else{
    carCount=localStorage.getItem("carCount");
    option7.value=carCount;
}
option7.addEventListener("change", () => {
    if(option7.value>1000){
        option7.value=1000;
    }
    localStorage.setItem("carCount",option7.value);
    carCount=option7.value;
    location.reload();
});
    location.reload();
});