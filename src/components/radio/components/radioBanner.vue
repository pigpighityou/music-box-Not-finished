<script setup>
import {getBanner} from '../../../axios/routes/djBanner.js';
import {ref,reactive} from 'vue'
let radioBannerAPI
let radioBannerList = reactive({
    radioBanner:[],
    failImages:[
            'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
        ]
});

(async ()=>{
    try{
        radioBannerAPI = await getBanner()
        radioBannerList.radioBanner = radioBannerAPI.data.data
       /*  console.log('ok',radioBannerList.radioBanner) */
    }
    catch(err){
        console.log(err)
    }
})();

const tick=ref(0)

setTimeout(function ticking(){
    if(tick.value<radioBannerList.radioBanner.length-1&&tick.value>=0){
        tick.value+=1
       
        
    }
    else{
        tick.value=0
    }
    setTimeout(ticking,2000)
   
   

},2000)




</script>



<template>


<div class="bannerWrapper">

    <div class="banner" >

        <div class="img">
            <img :src= "radioBannerList.radioBanner[tick]?.pic|| radioBannerList.failImages[0]" alt="pic" class="pic">

        </div>






    </div>

    



</div>






</template>


<style scoped>
.pic{
    width: 100vw;
    height: 40vw;
    border-radius: 3vw;
  
}
.img{
    width: 100%;
    height: 100%;

}


</style>


