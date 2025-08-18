class Controls{
    constructor(){
        this.forward=false;
        this.backward=false;
        this.left=false;
        this.right=false;
        this.#addKeyboardListeners();
    }
    #addKeyboardListeners(){
        document.onkeydown=(e)=>{
            if(e.key=="w"||e.key=="W"){
                this.forward=true;
            }
            else if(e.key=="s"||e.key=="S"){
                this.backward=true;
            }
            else if(e.key=="a"||e.key=="A"){
                this.left=true;
            }
            else if(e.key=="d"||e.key=="D"){
                this.right=true;
            }
        }
        document.onkeyup=(e)=>{
            if(e.key=="w"||e.key=="W"){
                this.forward=false;
            }
            else if(e.key=="s"||e.key=="S"){
                this.backward=false;
            }
            else if(e.key=="a"||e.key=="A"){
                this.left=false;
            }
            else if(e.key=="d"||e.key=="D"){
                this.right=false;
            }
        }
    }
}