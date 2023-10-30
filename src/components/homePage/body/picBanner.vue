<script setup>
import {getBannerAPI} from "../../../axios/routes/bannerAPI.js"
import {ref,reactive,computed,onMounted} from 'vue'
let banners=reactive({
    images:[
        
    ],
    failImages:[
    'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ],

})
let bannerAPI

let src=ref()



    //  为了防止setInterval累计间隔问题，使用setTimeout实现setInterval,实现轮播图
        //待实现功能：轮播图下方有小圆点，点击小圆点可以跳转到相应的图片，并且小圆点会变色，还会自动轮播      
    let picKey=ref(0)
        let timer=setTimeout(function interval(){
            if(picKey.value<banners.images.length-1&&picKey.value>=0){
            picKey.value+=1
        }
            else{
            picKey.value=0
        }

        // 待实现功能，如果用户向某个方向滑动，轮播图会滑动到某个方向的离得最近的图片，其他功能照旧，
            //这需要用到watch监听用户的滑动方向，或者用touch事件，touchstart，touchmove，touchend

        setTimeout(interval,2000)
           
        },2000)
       
        
        


onMounted( 
   
    // 需要修改，封装打包
    async ()=>{
           try{
        // 从下面添加页面渲染后所需要实现的功能
            //如果需要应用api里面的数据实现功能，必须把相应代码放在下面

            bannerAPI = await getBannerAPI()
            /* console.log("ok",bannerAPI) */ 
            banners.images = bannerAPI.data.banners //一个数组
            
            
            
           

            


           }
           catch(e)
           {console.log("error",error);}
            
    }
    )

</script>


<template>

 <div class="switchBannerWrapper">
  <img  :src="banners.images[picKey]?.pic|| banners.failImages[0]" alt="pic">  

  <!-- {{ banners.images[picKey]?.pic||banners.failImages[0] }}  -->
 

  
 </div>









  
  




</template>


<style scoped>


img{
   width:100vw;
   height:40vw;
    
}

.switchBannerWrapper{
    margin:1% auto ;
}





</style>


