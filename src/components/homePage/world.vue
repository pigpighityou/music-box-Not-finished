


<template>

    <div class="component">

        <div class="button">

            <router-link to="/singer">
            <singerButton></singerButton>
            </router-link>

            <router-link to="/dailyRec">
                <dailyRecButton></dailyRecButton>
            </router-link>


            <adButton></adButton>
          


        </div>

        


      
       

     
     


      
     <!-- 分路由组件 -->
    <dailyRecommandSong></dailyRecommandSong>
     <hotSinger></hotSinger>
     <hotSongList></hotSongList>
     <goodSong></goodSong>

                   
     <div class="recommend" >

       <recSongList class="rec"></recSongList>
       <!-- <recSongList2 class="rec"></recSongList2>
       <recSongList3 class="rec"></recSongList3>
       <recSongList4 class="rec"></recSongList4> -->

     </div>
    

     
   

   </div>



</template>





<style scoped>
.recommend{
    overflow: auto;
    display: flex;
    flex-direction: row;
    margin-left: 1.5vw;
    margin-bottom: 20vw;
   
  
}

.rec{
    margin: 0 0.5%;
}

.blank{
    height: 2vw;
}

.button{
    display: flex;
    flex-wrap: nowrap;
}



</style>

<script setup>

import {ref,reactive,onMounted,computed,watchEffect,nextTick} from 'vue'

import hotSinger from './body/hotSinger.vue';
import hotSongList from './body/hotSongList.vue';
import recSongList from './body/recSongList.vue';
/* import recSongList2 from './body/recSongList2.vue';
import recSongList3 from './body/recSongList3.vue';
import recSongList4 from './body/recSongList4.vue'; */
import goodSong from './body/goodSong.vue';
import singer from '../public/singer.vue';
import singerButton from '../public/singerButton.vue';
import dailyRecButton from '../public/dailyRecButton.vue'
import adButton from '../public/adButton.vue'
import dailyRecommandSong from './body/dailyRecommandSong.vue';






</script>