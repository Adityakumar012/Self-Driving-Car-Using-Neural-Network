let arr=[]
arr.push(new Array(6));
arr.push(new Array(6));
arr.push(new Array(4));
arr[0][0]=document.querySelector(".v11");
arr[0][1]=document.querySelector(".v12");
arr[0][2]=document.querySelector(".v13");
arr[0][3]=document.querySelector(".v14");
arr[0][4]=document.querySelector(".v15");
arr[0][5]=document.querySelector(".v16");
arr[1][0]=document.querySelector(".v21");
arr[1][1]=document.querySelector(".v22");
arr[1][2]=document.querySelector(".v23");
arr[1][3]=document.querySelector(".v24");
arr[1][4]=document.querySelector(".v25");
arr[1][5]=document.querySelector(".v26");
arr[2][0]=document.querySelector(".v31");
arr[2][1]=document.querySelector(".v32");
arr[2][2]=document.querySelector(".v33");
arr[2][3]=document.querySelector(".v34");
function updateNeural(levels,control){
    for(let i=0;i<2;i++){
        for(let j=0;j<arr[i].length;j++){
            if(levels[i+1].output[j]){
                arr[i][j].style.backgroundColor="yellow";
            }else{
                arr[i][j].style.backgroundColor="black";
            }
        }
    }
    if(control.forward){
        arr[2][0].style.backgroundColor="yellow";
        arr[2][0].style.color="black";
    }else{
        arr[2][0].style.backgroundColor="black";
        arr[2][0].style.color="white";
    }
    if(control.backward){
        arr[2][1].style.backgroundColor="yellow";
        arr[2][1].style.color="black";
    }else{
        arr[2][1].style.backgroundColor="black";
        arr[2][1].style.color="white";
    }
    if(control.left){
        arr[2][2].style.backgroundColor="yellow";
        arr[2][2].style.color="black";
    }else{
        arr[2][2].style.backgroundColor="black";
        arr[2][2].style.color="white";
    }
    if(control.right){
        arr[2][3].style.backgroundColor="yellow";
        arr[2][3].style.color="black";
    }else{
        arr[2][3].style.backgroundColor="black";
        arr[2][3].style.color="white";
    }

}