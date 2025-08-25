let greenRay =1;
let redRay =1;
let carCount=50;
let lanes=4;
let genaticRandomness=0.001;
let trafficProbablity=0.19;
let rayCount=20;
let rayRange=300;
let rayAngle=90;
let alpha=0.2;
let maxSpeed=7.5;
let race=0;
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const option5 = document.getElementById("option5");
const option6 = document.getElementById("option6");
const option7 = document.getElementById("option7");
const option8 = document.getElementById("option8");
const option9 = document.getElementById("option9");
const label3 = document.getElementById("label3");
const label4 = document.getElementById("label4");
const label5 = document.getElementById("label5");
const label6 = document.getElementById("label6");
const label7 = document.getElementById("label7");
function updateSlider(event) {
    const value=event.value;
    const min=parseFloat(event.min) || 0;
    const max=parseFloat(event.max) || 100;
    const percentage=((value-min)/(max-min))*100;
    event.style.background=`linear-gradient(to right, #667eea 0%, #667eea ${percentage}%,#ddd ${percentage}%, #ddd 100%)`;
}
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
if (!localStorage.getItem("speed")) {
    option3.value=7;
    maxSpeed=7;
}
else{
    maxSpeed=parseFloat(localStorage.getItem("speed"));
    option3.value=maxSpeed;
    label3.textContent = `max speed ${maxSpeed*10}`;
}
updateSlider(option3);
option3.addEventListener("input", () => {
    updateSlider(option3);
    localStorage.setItem("speed",option3.value);
    maxSpeed=option3.value;
    label3.textContent = `max speed ${maxSpeed*10}`;
});
if (!localStorage.getItem("rayRange")) {
    option4.value=300;
    rayRange=300;
}
else{
    rayRange=parseInt(localStorage.getItem("rayRange"));
    option4.value=rayRange;
    label4.textContent = `sensor Range ${rayRange}`;
}
updateSlider(option4);
option4.addEventListener("input", () => {
    updateSlider(option4);
    localStorage.setItem("rayRange",option4.value);
    rayRange=option4.value;
    label4.textContent = `sensor Range ${rayRange}`;
});
if (!localStorage.getItem("rayAngle")) {
    option5.value=90;
    rayAngle=90;
}
else{
    rayAngle=parseInt(localStorage.getItem("rayAngle"));
    option5.value=rayAngle;
    label5.textContent = `sensor angle ${rayAngle}`;
}
updateSlider(option5);
option5.addEventListener("input", () => {
    updateSlider(option5);
    localStorage.setItem("rayAngle",option5.value);
    rayAngle=option5.value;
    label5.textContent = `sensor angle ${rayAngle}`;
});
if (!localStorage.getItem("alpha")) {
    option6.value=0.2;
    alpha=0.2;
}
else{
    alpha=parseFloat(localStorage.getItem("alpha"));
    option6.value=alpha;
    label6.textContent = `transparency ${alpha}`;
}
updateSlider(option6);
option6.addEventListener("input", () => {
    updateSlider(option6);
    localStorage.setItem("alpha",option6.value);
    alpha=option6.value;
    label6.textContent = `transparency ${alpha}`;
});
if (!localStorage.getItem("rayCount")) {
    option8.value=20;
    rayCount=20;
}
else{
    rayCount=parseInt(localStorage.getItem("rayCount"));
    option8.value=rayCount;
}
option8.addEventListener("change", () => {
    if(parseInt(option8.value)>400){
        option8.value=400;
    }
    localStorage.setItem("rayCount",parseInt(option8.value));
    rayCount=parseInt(option8.value);
    localStorage.removeItem("bestneural");
    location.reload();
});
if (!localStorage.getItem("carCount")) {
    option9.value=50;
    carCount=50;
}
else{
    carCount=parseInt(localStorage.getItem("carCount"));
    option9.value=carCount;
}
option9.addEventListener("change", () => {
    if(parseInt(option9.value)>1000){
        option9.value=1000;
    }
    localStorage.setItem("carCount",parseInt(option9.value));
    carCount=parseInt(option9.value);
    location.reload();
});
function sliderToValue(sliderPos) {
    const logValue=-sliderPos/10;
    return Math.pow(10,logValue);
}
function formatValue(value) {
    const percentage=value*100;
    let str=percentage.toFixed(2);
    str=str.replace(/\.?0+$/, '');
    return str;
}
if (!localStorage.getItem("genaticRandomness")) {
    option7.value=10;
    genaticRandomness=0.1;
}
else{
    genaticRandomness=sliderToValue(parseInt(localStorage.getItem("genaticRandomness")));
    option7.value=parseInt(localStorage.getItem("genaticRandomness"));
    label7.textContent = `genatic randomness ${formatValue(genaticRandomness)}%`;
}
option7.addEventListener("input", () => {
    const value=sliderToValue(parseInt(option7.value));
    localStorage.setItem("genaticRandomness",parseInt(option7.value));
    genaticRandomness=value;
    label7.textContent = `genatic randomness ${formatValue(genaticRandomness)}%`;
});