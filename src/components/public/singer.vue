<script setup>

import hotSingerAlias from './hotSingerAlias.vue';
import chooseSinger from './chooseSinger.vue';
import { ref, reactive,provide } from 'vue';


const button1Num = ref(-1);
const button2Num = ref(-1);

const onClickLeft = () => history.back();

provide('button',{
    button1Num,
    button2Num
})








</script>


<template>

<van-nav-bar
  title="歌手"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
  class="navBar"
/>


   <hotSingerAlias></hotSingerAlias> 

    <chooseSinger></chooseSinger>

     


    



  

            
            

    






 



</template> 



<style scoped>






</style>