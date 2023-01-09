/**
 * 该脚本是游戏对象蛇的脚本
 */

import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject{
    constructor(info,gamemap){
        super();
        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r,info.c)];//存放蛇刚开始的身体 （只有一个点）cells[0]存放蛇头
    }

    start(){

    }

    update(){
        this.render();
    }

    render(){
        const ctx = this.gamemap.ctx;
        const L = this.gamemap.L;
        ctx.fillStyle = this.color;

        for(const cell of this.cells){
            ctx.beginPath();
            ctx.arc(cell.x * L ,cell.y * L,L / 2 , 0 , 2 * Math.PI);
            ctx.fill();
        }
    }
}