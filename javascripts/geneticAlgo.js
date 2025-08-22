function nextval(a,b,r) {
    if(a>b){
        a-(a-b)*r;
    }
    return a+(b-a)*r;
}
function genaticrandom(network,randomness=0.9){
    network.levels.map(level => {
        for(let i=0;i<level.bias.length;i++){
            const newVal=Math.random()*2-1;
            level.bias[i]=nextval(level.bias[i],newVal,randomness);
        }
        for(let i=0;i<level.weigth.length;i++){
            for(let j=0;j<level.weigth[i].length;j++){
                const newVal=Math.random()*2-1;
                level.weigth[i][j]=nextval(level.weigth[i][j],newVal,randomness);
            }
        }
    });
    return network;
}