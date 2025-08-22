class Network{
    constructor(nodeLevelCount){
        this.levels=[];
        for(let i=0;i<nodeLevelCount.length-1;i++){
            this.levels.push(new Level(nodeLevelCount[i],nodeLevelCount[i+1]));
        }
    }
    static networkFeedForward(input,network){
        let output=input;
        for(let i=0;i<network.levels.length;i++){
            output=Level.feedForward(output,network.levels[i]);
        }
        return output;
    }
    
}
class Level{
    constructor(inputNodes,outputNodes){
        this.input=new Array(inputNodes);
        this.output=new Array(outputNodes);
        this.bias=new Array(outputNodes);
        this.weigth=[];
        for(let i=0;i<inputNodes;i++){
            this.weigth[i]=new Array(outputNodes);
        }
        Level.#getRandom(this);
    }
    static #getRandom(Level){
        for(let i=0;i<Level.input.length;i++){
            for(let j=0;j<Level.output.length;j++){
                Level.weigth[i][j]=Math.random()*2-1;
            }
        }
        for(let i=0;i<Level.output.length;i++){
            Level.bias[i]=Math.random()*2-1;
        }
    }
    static feedForward(inputVal,Level){
        for(let i=0;i<inputVal.length;i++){
            Level.input[i]=inputVal[i];
        }
        for(let i=0;i<Level.output.length;i++){
            let sum=0;
            for(let j=0;j<Level.input.length;j++){
                sum+=Level.input[j]*Level.weigth[j][i];
            }
            if(sum+Level.bias[i]>0){
                Level.output[i]=1;
            }else{
                Level.output[i]=0;
            }
        }
        return Level.output;
    }
}