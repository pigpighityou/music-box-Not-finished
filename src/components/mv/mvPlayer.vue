<script setup>
import {ref,reactive,watchEffect} from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { getMvDetail } from '@/axios/routes/mv';
import {getMvUrl} from '@/axios/routes/mv'

const route = useRoute();
const router = useRouter();
const id=ref(route.params.id)
console.log(id.value);




let mvDetailAPI
let mvUrlAPI

let mvDetailData=reactive({
    data:{},
  
});

let mvUrlData=reactive({
    data:{},
  
});

 (async ()=>{
    mvDetailAPI=await getMvDetail(id.value)
    mvDetailData.data=mvDetailAPI.data.data
    console.log('okDetail',mvDetailData.data);
})();

 (async ()=>{
    mvUrlAPI=await getMvUrl(id.value)
    mvUrlData.data=mvUrlAPI.data.data
    console.log('okMvUrl',mvUrlData.data);
})() ;











</script>



<template>

    <div class="playerWrapper">



    <video  :src="mvUrlData.data.url"  controls  class="player">
      
        <source :src="mvUrlData.data.url" >
        

    </video>









    </div>



</template>



<style scoped>
.player{
    width: 100vw;
    height: 60vw;
    background-color: black;

   
}







</style>