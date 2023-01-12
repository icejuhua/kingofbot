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

        //眼睛方向

        this.eye_direction = 0;
        if(this.id === 1){
            this.eye_direction = 2;
        } 

        //定义蛇眼偏移量
        
        this.eye_dx = [
            [-1 , 1],
            [1 , 1],
            [-1 , 1],
            [-1 , -1]
        ]
        this.eye_dy = [
            [-1 , -1],
            [-1 , 1],
            [1 , 1],
            [-1 , 1]
        ]

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
            //判断是否要去掉蛇尾
            if(!this.check_tail_increasing()){
                this.cells.pop();
            }

        }else {
            const move_distance = this.speed * this.timedelta / 1000;//保存一针走的距离 
            this.cells[0].x += move_distance * (dx / distance);
            this.cells[0].y += move_distance * (dy / distance);
            //移动蛇尾
            if(!this.check_tail_increasing()){
                const k = this.cells.length;
                const tail = this.cells[k - 1];//蛇尾
                const tail_target = this.cells[k - 2];//蛇尾移动的目标位置
                const dx_tail = tail_target.x - tail.x;
                const dy_tail = tail_target.y - tail.y;
                tail.x += move_distance * (dx_tail / distance);
                tail.y += move_distance * (dy_tail / distance);
            }
        }


    }

    /**
     * 检测当前回合，蛇的长度是否增加
     * 前十回合每回合增加，后面每三回合增加一次长度
     */
    check_tail_increasing(){
        if(this.step <= 10) return true;
        if(this.step %3 === 1) return true;
        return false;
    }

    next_step(){
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d] , this.cells[0].c + this.dc[d]);
        this.direction = -1;//清空命令;
        this.status = "move";
        this.step ++;
        
        this.eye_direction = d;


        const k = this.cells.length;
        for(let i = k ; i > 0 ; i --){
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if(!this.gamemap.check_vaild(this.next_cell)){
            this.status = "die";
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
        if(this.status === "die"){
            ctx.fillStyle = "white";
        }

        for(const cell of this.cells){
            ctx.beginPath();
            ctx.arc(cell.x * L ,cell.y * L,L / 2 * 0.8 , 0 , 2 * Math.PI);
            ctx.fill();
        }

        //填充蛇之间的缝隙
        for(let i = 1 ; i < this.cells.length ; i ++){
            const a = this.cells[i - 1],b = this.cells[i];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
            continue;
            //如果两个点之间是上下关系
            if(Math.abs(a.x - b.x) < this.eps){
                ctx.fillRect((a.x - 0.4) * L , Math.min(a.y , b.y) * L , L * 0.8 , Math.abs(a.y - b.y) * L );
            }
            //如果两个点是水平关系
            else {
                ctx.fillRect(Math.min(a.x , b.x) * L , (a.y - 0.4) * L ,Math.abs(a.x - b.x) * L ,L * 0.8)
            }
        }

        //填充眼睛
        ctx.fillStyle = "black";
        for(let i = 0 ; i < 2 ; i ++){
            const eye_dx = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
            const eye_dy = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;
            ctx.beginPath();
            ctx.arc(eye_dx , eye_dy , L * 0.05 , 0 , Math.PI * 2);
            ctx.fill();
        }
        
    }
}