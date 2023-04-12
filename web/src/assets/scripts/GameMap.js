
import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject{
    constructor(ctx,parent,store){
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.rows = 13;
        this.cols = 14;
        this.store = store;
        this.L = 0; //表示绝对距离，L表示一个单位的长度
        this.walls = [];
        this.iner_Walls_count = 20;//内部障碍物数量

        this.snakes = [
            new Snake({id : 0,color:"#4876EC",r : this.rows - 2,c : 1},this),
            new Snake({id : 1,color:"#F94848",r : 1,c : this.cols - 2},this),
        ]
    }

    start(){
        this.create_wall();
        this.add_listening_events();
        
    }


    create_wall(){
        const g = this.store.state.pk.gamemap;
       //添加墙
       for(let r = 0 ; r < this.rows; r ++){
            for(let c = 0 ; c < this.cols ; c++){
                if(g[r][c]){
                    this.walls.push(new Wall(r,c,this));
                }
            }
       }
       
    }

    update_size(){
        this.rander();
        /*
        *parseInt去整形像素
        *
        * */
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols,this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }
    /**
     * 检查蛇是否能够进入下一回合
     */
    check_ready(){
        for(const snake of this.snakes){
            if(snake.status !== "idle") return false;
            if(snake.direction === -1 ) return false;
        }
        return true;
    }
    /**
     * 下一回合的辅助函数，让两条蛇进入下一回合
     */
    next_step(){
        for(const snake of this.snakes){
            snake.next_step();
        }
    }
    /**
     * 获取用户输入事件
     */
    add_listening_events(){
        this.ctx.canvas.focus();

        const [snake0,snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if(e.key === 'w') snake0.set_direction(0);
            else if(e.key === 'd') snake0.set_direction(1);
            else if(e.key === 's') snake0.set_direction(2);
            else if(e.key === 'a') snake0.set_direction(3);
            else if(e.key === 'ArrowUp') snake1.set_direction(0);
            else if(e.key === 'ArrowRight') snake1.set_direction(1);
            else if(e.key === 'ArrowDown') snake1.set_direction(2);
            else if(e.key === 'ArrowLeft') snake1.set_direction(3);
        })

    }
    /**
     * 判断蛇的下一个位置是否合法
     * @param {*} cell:表示下一个格子 
     */
    check_vaild(cell){
        for(const wall of this.walls){
            if(wall.r === cell.r && wall.c === cell.c){
                return false;
            }
        }

        for(const snake of this.snakes){
            let k = snake.cells.length;
            if(!snake.check_tail_increasing()){
                k --; //当蛇尾没边长时，不需要判断
            }

            for(let i = 0 ; i < k ;i ++){
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c){
                    return false;
                }
            }
        }
        return true;

    }

    update(){
        
        this.update_size();
        if(this.check_ready()){
            this.next_step();
        }
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