<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top : 20px;">
                    <div class="card-body" style="text-align: center;">
                        <img class="head_img" :src="$store.state.user.photo" alt="">
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card" style="margin-top:20px;">
                    <div class="card-header">
                        <span class="head-font-size">我的Bot</span>
                        
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">
                            创建Bot
                        </button>
                        <div class="modal fade" id="add-bot-btn" tabindex="-1">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">创建Bot</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="add-bot-title" class="form-label">名称</label>
                                        <input v-model="botadd.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                                    </div>
                                    <div class="mb-3">
                                        <label for="add-bot-description" class="form-label">Bot简介</label>
                                        <textarea v-model="botadd.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot的描述信息"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="add-bot-code" class="form-label">代码</label>
                                        <VAceEditor
                                            v-model:value="botadd.content"
                                            @init="editorInit"
                                            lang="c_cpp"
                                            theme="textmate"
                                            style="height: 300px"
                                            :options="{
                                            enableBasicAutocompletion: true, //启用基本自动完成
                                            enableSnippets: true, // 启用代码段
                                            enableLiveAutocompletion: true, // 启用实时自动完成
                                            fontSize: 14, //设置字号
                                            tabSize: 2, // 标签大小
                                            showPrintMargin: false, //去除编辑器里的竖线
                                            highlightActiveLine: true,
                                            }"
                                                />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="error-message">{{ botadd.error_message }}</div>
                                    <button type="button" class="btn btn-primary" @click="add_bot ">创建</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in bots" :key="bot.id">
                                    <td>{{ bot.title }}</td>
                                    <td>{{ bot.createtime }}</td>
                                    <td>
                                        <button type="button" class="btn btn-success" style="margin-right:10px" data-bs-toggle="modal" :data-bs-target="'#updata-bot-' + bot.id">修改</button>
                                        <div class="modal fade" :id="'updata-bot-'+bot.id" tabindex="-1">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5">修改Bot</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="mb-3">
                                                        <label for="add-bot-title" class="form-label">名称</label>
                                                        <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="add-bot-description" class="form-label">Bot简介</label>
                                                        <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot的描述信息"></textarea>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="add-bot-code" class="form-label">代码</label>
                                                        <VAceEditor
                                                        v-model:value="bot.content"
                                                            @init="editorInit"
                                                            lang="c_cpp"
                                                            theme="textmate"
                                                            style="height: 300px"
                                                            :options="{
                                                            enableBasicAutocompletion: true, //启用基本自动完成
                                                            enableSnippets: true, // 启用代码段
                                                            enableLiveAutocompletion: true, // 启用实时自动完成
                                                            fontSize: 14, //设置字号
                                                            tabSize: 2, // 标签大小
                                                            showPrintMargin: false, //去除编辑器里的竖线
                                                            highlightActiveLine: true,
                                                            }" />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <div class="error-message">{{ bot.error_message }}</div>
                                                    <button type="button" class="btn btn-primary" @click="updata_bot(bot) ">保存修改</button>
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-danger" @click="remove_bot(bot)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref,reactive } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import { Modal } from 'bootstrap/dist/js/bootstrap';
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';


export default{
    components :{
        VAceEditor,
    },
    setup(){
        ace.config.set(
        "basePath", 
        "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")
        const store = useStore();
        let bots = ref([]); 
        const botadd = reactive({
            title : "",
            description:"",
            content : "",
            error_message : "",
        });


        const refresh_bot = () => {
        $.ajax({
            url : "http://localhost:8075/user/bot/getlist/",
            type : "get",
            headers: {
                Authorization : "Bearer " + store.state.user.token,
            },
            success(resp){
                bots.value = resp;
            },
        })
       }

       refresh_bot();

       const add_bot = () =>{
            botadd.error_message = "",
            $.ajax({
                url : "http://localhost:8075/user/bot/add/",
                type : "post",
                data:{
                    title : botadd.title,
                    description : botadd.description,
                    content : botadd.content,
                },
                headers:{
                    Authorization : "Bearer " + store.state.user.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        refresh_bot();
                        botadd.title = "";
                        botadd.description = "";
                        botadd.content = "";
                        Modal.getInstance("#add-bot-btn").hide();  //添加完成之后隐藏弹出框
                    } else{
                        botadd.error_message = resp.error_message;
                    }
                }
            })

       };

       const remove_bot = (bot) =>{
            $.ajax({
                url : "http://localhost:8075/user/bot/remove/",
                type : "post",
                data : {
                    bot_id : bot.id,
                },
                headers :{
                    Authorization : "Bearer " + store.state.user.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        refresh_bot();
                    }
                }
            })
       };

       const updata_bot = (bot) =>{
            $.ajax({
                url : "http://localhost:8075/user/bot/updata/",
                type : "post",
                data : {
                    bot_id : bot.id,
                    title : bot.title,
                    description : bot.description,
                    content : bot.content,
                },
                headers : {
                    Authorization : "Bearer " + store.state.user.token,
                },
                success(resp){
                    if(resp.error_message === "success"){
                        refresh_bot();
                        Modal.getInstance("#updata-bot-"+bot.id).hide();
                    }
                }
            })

       }



       return{
            refresh_bot,
            bots,
            botadd,
            add_bot,
            remove_bot,
            updata_bot,
       }
    }
}
</script>

<style scoped>
.head-font-size{
    font-size: 120%;
}
.head_img{
    width: 60%;
    height: 60%;
}
div.error-message{
    color: red;
}
</style>