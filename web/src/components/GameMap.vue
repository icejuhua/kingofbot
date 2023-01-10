<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>

<script>
import { GameMap } from '@/assets/scripts/GameMap';
import { ref,onMounted } from 'vue';


export default {
    setup(){
        let canvas = ref(null);
        let parent = ref(null);

        onMounted( () => {
            new GameMap(canvas.value.getContext('2d'),parent.value)
        })
        return{
            canvas,
            parent,
        }

    }
}
</script>

<style>
div.gamemap{
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>