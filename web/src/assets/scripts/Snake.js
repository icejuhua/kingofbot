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

        this.speed = 5 ;//每一帧移动的距离

        this.direction = -1; //表示指令: -1表示没有指令 0 1 2 3 表示上右下左的指令
        this.status = "idle"; //表示蛇的状态 "idle"表示停止 "move"表示正在移动  "die表示死亡"
        //定义偏移量
        this.dr = [-1 , 0 , 1 , 0]
        this.dc = [0 , 1 , 0 , -1];

        this.step = 0;//表示回合数
        this.eps = 1e-2; //表示移动允许的误差

    }

    start(){

    }
     /**
     * 表示每帧更新蛇的移动
     * timedelta表示两帧之间的间隔  /1000表示转换成秒
     */
    update_move(){
       
        
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        //如果距离小于允许的误差则停止移动，否则继续移动
        if(distance < this.eps){
            
            this.cells[0] = this.next_cell;
            this.next_cell = null;
            this.status = "idle";//状态变为停止
        }else {
            const move_distance = this.speed * this.timedelta / 1000;//保存一针走的距离 
            this.cells[0].x += move_distance * (dx / distance);
            this.cells[0].y += move_distance * (dy / distance);

        }


    }
    next_step(){
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d] , this.cells[0].c + this.dc[d]);
        this.direction = -1;//清空命令;
        this.status = "move";
        this.step ++;


        const k = this.cells.length;
        for(let i = k ; i > 0 ; i --){
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }
    }
    /**
     * 辅助函数，设置命令
     * @param {输入的方向} d
     *  
     */
    set_direction(d){
        this.direction = d;
    }

    update(){
        if(this.status === "move"){
            this.update_move();
        }
        
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