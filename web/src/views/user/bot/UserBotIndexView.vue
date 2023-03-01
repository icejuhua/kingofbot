<template>
    <ContentField>
        我的Bot
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
import $ from 'jquery'
import { useStore } from "vuex"

export default{
    components:{
        ContentField,
    },
    setup(){
        const store = useStore();
        // $.ajax({
        //     url :"http://localhost:8075/user/bot/add/",
        //     type : "post",
        //     data : {
        //         title : "我的第一个Bot",
        //         description: "12333",
        //         content : "#include<>",
        //     },
        //     headers : {
        //         Authorization : "Bearer " + store.state.user.token,
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // })
        // $.ajax({
        //     url :"http://localhost:8075/user/bot/remove/",
        //     type : "post",
        //     data : {
        //         bot_id : 8,
        //     },
        //     headers : {
        //         Authorization : "Bearer " + store.state.user.token,
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
            
        // })
        // $.ajax({
        //     url :"http://localhost:8075/user/bot/updata/",
        //     type : "post",
        //     data : {
        //         bot_id : 6,
        //         title : "修改信息",
        //         description: "修改的bot",
        //         content : "修改的bot代码",
        //     },
        //     headers : {
        //         Authorization : "Bearer " + store.state.user.token,
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // })
        $.ajax({
            url :"http://localhost:8075/user/bot/getlist/",
            type : "get",
            headers : {
                Authorization : "Bearer " + store.state.user.token,
            },
            success(resp){
                console.log(resp);
            },
            error(resp){
                console.log(resp);
            }
        })
    }
}
</script>

<style scoped>
</style>