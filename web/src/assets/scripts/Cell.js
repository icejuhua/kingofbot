/**
 * 该脚本表示一个蛇的一个格子
 */


export class Cell{
    constructor(r , c){
        this.r = r;
        this.c = c;
        //根据canvas进行行列转换
        this.x = this.c + 0.5;
        this.y = this.r + 0.5;
    }
} 