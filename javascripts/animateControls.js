const left=document.getElementById("left");
const up=document.getElementById("up");
const down=document.getElementById("down");
const right=document.getElementById("right");
function animateControl(x){
    if(x.forward){
        up.style.backgroundColor="yellow";
        up.style.color="black";
    }
    else{
        up.style.backgroundColor="";
        up.style.color="";
    }
    if(x.left){
        left.style.backgroundColor="yellow";
        left.style.color="black";
    }
    else{
        left.style.backgroundColor="";
        left.style.color="";
    }
    if(x.right){
        right.style.backgroundColor="yellow";
        right.style.color="black";
    }
    else{
        right.style.backgroundColor="";
        right.style.color="";
    }
    if(x.backward){
        down.style.backgroundColor="yellow";
        down.style.color="black";
    }
    else{
        down.style.backgroundColor="";
        down.style.color="";
    }
}