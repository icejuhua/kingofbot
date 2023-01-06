import { AcGameObject } from "./AcGameObject";

export class GameMap extends AcGameObject{
    constructor(ctx,parent){
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.rows = 13;
        this.cols = 13;

        this.L = 0; //表示绝对距离，L表示一个单位的长度
    }

    start(){

    }
    update_size(){
        this.rander();
        this.L = Math.min(this.parent.clientWidth / this.cols,this.parent.clientHeight / this.rows);
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }
    update(){
        
        this.update_size();
        this.rander();

    }
    rander(){


        const color_even = "#AAD751" , color_odd = "#A2D149";
        for(let r = 0 ; r < this.rows ; r ++){
            for(let c = 0 ; c < this.cols ; c ++){
                if((c + r) %2 == 0){
                    this.ctx.fillStyle = color_even;
                }else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L,r * this.L,this.L,this.L );
            }
        }


    }
}