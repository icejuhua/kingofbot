<template>
    <div class="PlayGround">
        <GameMap />
    </div>

</template>

<script>
import GameMap from "./GameMap.vue"

export default{
    components:{
        GameMap,
    }
}

</script>

<style scoped>
div.PlayGround{
    width: 60vw;
    height: 70vh;
    margin: 60px auto;
    
}

</style>