<script setup>
import {ref,reactive,computed,watchEffect} from 'vue'
import {useRouter,useRoute} from 'vue-router'



import {getSingerMV} from '../../axios/routes/singerInfo'


const route=useRoute()

const id=ref(route.params.id)
console.log('mvSinger',id.value);

let singerMVAPI

const singerMV=reactive({
  data:[],
});



(async()=>{
  singerMVAPI=await getSingerMV(id.value)
  singerMV.data=singerMVAPI.data
   console.log('okMV',singerMV.data); 
})();
</script>



<template>



    <div>
        
    </div>



</template>



<style scoped>




</style>