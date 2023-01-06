
const AC_GAME_OBJECT = [];

export class AcGameObject{
    constructor(){
        AC_GAME_OBJECT.push(this);
        this.has_called_start = false;
        this.timedelta = 0;

    }
    start(){ // 开始之后只执行一次

    }
    update(){   //除了开始每一帧执行一次

    }
    on_destory(){ //删除前执行一次

    }

    destory(){  //删除执行
        this.on_destory();


        for(let i in AC_GAME_OBJECT){
            const obj = AC_GAME_OBJECT[i];
            if(obj === this){
                AC_GAME_OBJECT.splice(i);
                break;
            }
        }
    }

    
}
let last_timedelta;
const step = timestamp => {
    for(let obj of AC_GAME_OBJECT){
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.update();
            obj.timedelta =  timestamp - last_timedelta; 
        }
    }
    last_timedelta = timestamp;


    requestAnimationFrame(step);
}


requestAnimationFrame(step);