<script setup>
import { ref,reactive } from 'vue'

import {storeRadio} from '@/axios/routes/store.js'
import {recentRadio} from '@/axios/routes/store.js'

let storeRadioAPI
let recentRadioAPI

let storeRadioData = reactive({
    data: []
})

let recentRadioData = reactive({
    data: []
});

const userId=ref(localStorage.getItem('userData'))
console.log('userId',userId.value.userId);

(async () => {
    storeRadioAPI = await storeRadio()
    storeRadioData.data = storeRadioAPI.data.data
     console.log('okstore',storeRadio.data); 
   

})();

(async () => {
    recentRadioAPI = await recentRadio()
    recentRadioData.data = recentRadioAPI.data.data
     console.log('okrecent',recentRadio.data); 

})();





 const active = ref(0);
 const onClickLeft = () => history.back();


</script>



<template>

<van-nav-bar
  title="收藏"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>


<van-tabs v-model:active="active">
  <van-tab title="订阅的播客">
    
    <div class="storeAlbumWrapper">

        <div class="storeAlbum" v-for="(item3, index3) in storeRadio.data" :key="index3">
            
                <div class="album">
                <router-link :to="{name:'album',params:{id:item3.id}}">
                    <img :src="item3.picUrl" alt="pic3" class="albumPic">
                </router-link>
                </div>

                <div class="desc">
                    <div class="alName">
                    {{item3.name}}
                    </div>
                    <div class="singer" v-for="(item4, index4) in item3.artists" :key="index4">
                            {{ item4.name}}
                    </div>
                </div>

            
            
               

        </div>



    </div>




</van-tab>
  <van-tab title="最近播放">
    
    <div class="storeMVWrapper">

        <div class="storeMV" v-for="(item, index) in recentRadio.data" :key="index">

            <div class="pic">
                    <img :src="item.coverUrl" alt="pic" class="mvPic">
            </div>

            <div class="desc">

                
                <div class="intro">
                    {{item.title}}
                </div>

                <div class="creator" v-for="(item1, index1) in item.creator" :key="index">
                    {{item1.userName}}
                </div>

            </div>
            


        </div>
    </div> 
    
   






</van-tab>
 
</van-tabs>

{{ userId }}

</template>



<style scoped>
.storeMV{
    display: flex;
    flex-direction: row;
    margin-top: 2vw;
    margin-left: 1vw;
    margin-right: 1vw;
    border-radius: 2vw;
    background-color: whitesmoke;
    height: 37vw;
}

.desc{
    display: flex;
    flex-direction: column;
    margin-left: 1vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
    width: 60vw;
}

.intro{
    margin-top: 1vw;
    margin-bottom: 2vw;
    margin-left: 1vw;
    font-size: 4vw;
    color: black;
}

.creator{
    margin-top: 1vw;
    margin-left: 1vw;
    font-size: 3vw;
    color: rgb(92, 87, 87);
}




.mvPic{
    width: 48vw;
    height: 37vw;
    border-radius: 2vw;
}

.storeAlbum{
    display: flex;
    flex-direction: row;
    margin-top: 2vw;
    margin-left: 1vw;
    margin-right: 1vw;
    border-radius: 2vw;
    background-color: whitesmoke;
   
}


.albumPic{
    width: 45vw;
    height: 43vw;
    border-radius: 2vw;
}

.alName{
    margin-top: 1vw;
    margin-left: 1vw;
    font-size: 4vw;
    color: black;
}

.singer{
    margin-top: 1vw;
    margin-left: 1vw;
    font-size: 3vw;
    color: rgb(92, 87, 87);
}









</style>





