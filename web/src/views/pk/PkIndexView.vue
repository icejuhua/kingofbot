<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'"/>
    <MatchGround v-if="$store.state.pk.status === 'matching'"/>
</template>

<script>
import PlayGround from '@/components/PlayGround.vue'
import MatchGround from '@/components/MatchGround.vue'
import { onMounted , onUnmounted } from 'vue';
import { useStore } from 'vuex'

export default{
    components:{
        PlayGround,
        MatchGround,
    },
    setup(){
        const store = useStore();
        const socketUrl = `ws://localhost:8075/websocket/${store.state.user.token}/`;
        let socket = null; 
        //setup先于onMounted执行
        onMounted(() => {
            socket = new WebSocket(socketUrl);

            store.commit("updateOpponent",{
                username:"我的对手",
                photo : "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            })

            socket.onopen = () =>{
                store.commit("updateSocket",socket)
            }
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if(data.event === "start-matching"){
                    store.commit("updateOpponent",{
                        username : data.opponent_username,
                        photo : data.opponent_photo,
                    });
                    setTimeout(() => {
                        store.commit("updateStatus","playing");
                    },2000);
                    store.commit("updateGamemap",data.gamemap);
                }
            }
            socket.onclose = () =>{
            }

        })
        //卸载的时候断开socket连接，否则每次打开pk界面时会重新建立连接
        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus","matching");
        })
    }
}

</script>

<style scoped>

</style>