
import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject{
    constructor(ctx,parent){
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.rows = 13;
        this.cols = 14;

        this.L = 0; //表示绝对距离，L表示一个单位的长度
        this.walls = [];
        this.iner_Walls_count = 20;//内部障碍物数量

        this.snakes = [
            new Snake({id : 0,color:"#4876EC",r : this.rows - 2,c : 1},this),
            new Snake({id : 1,color:"#F94848",r : 1,c : this.cols - 2},this),
        ]
    }

    start(){
        for(let i = 0 ; i < 1000 ; i++){
            if(this.create_wall())
            break;
        }
        this.add_listening_events();
        
    }
    /**检查地图是否能够连通
     * 
     */
    check_connectivity(copy_p, sx, sy, tx, ty){
        if(sx == tx && sy == ty) return true;
        copy_p[sx][sy] = true;
        let dx = [-1 , 0 , 1 , 0];
        let dy = [0 , 1 , 0 , -1];
        for(let i = 0 ; i< 4 ; i++){
            let x = sx + dx[i] , y = sy + dy[i];
            if(!copy_p[x][y] && this.check_connectivity(copy_p,x,y,tx,ty)) return true;
        } 
        return false;

        
    }

    create_wall(){
       const g = [];
       //初始化状态数组，表示所有格子都没有墙
       for(let r = 0 ; r < this.rows ; r ++){
            g[r] = [];
            for(let c = 0 ; c < this.cols ; c ++){
                g[r][c] = false;
            }
       }

       /*给四周加上墙
       *
       */
       //改变状态数组
       for(let r = 0 ; r < this.rows ; r ++){
        g[r][0] = g[r][this.cols - 1] = true;
       }
        //给上下加上墙
        for(let c = 0 ; c < this.cols ; c ++){
            g[0][c] = g[this.rows - 1][c] = true;
           }
        /**添加随机障碍物
        * 1、保证两边障碍物对称
        * 2、保证左下角和右上角没有障碍物
        * 3、保证地图连通性
        */
       for(let i = 0 ; i < this.iner_Walls_count / 2 ; i ++){
        for(let j = 0 ; j < 1000 ; j++){
            //分别取行列随机数
            let r = parseInt(Math.random() * this.rows);
            let c = parseInt(Math.random() * this.cols);
            if(g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
            if(r == this.rows - 2 && c == 1 || c == this.cols - 2 && r == 1) continue;
            g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
            break; 
        }
       }
       //保存一下状态数组，以免检查的时候修改了数据 ，需要用深度拷贝
       const copy_p = JSON.parse(JSON.stringify(g));


       //判断地图是否能够连通,无法连通则返回false
       if(!this.check_connectivity(copy_p,this.rows -2 , 1 , 1 , this.cols - 2)) return false;

       //添加墙
       for(let r = 0 ; r < this.rows; r ++){
        for(let c = 0 ; c < this.cols ; c++){
            if(g[r][c]){
                this.walls.push(new Wall(r,c,this));
            }
        }
       }
       //当地图能连通后再生成
       return true
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