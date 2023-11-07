


<template>
    <div class="title">
        热门歌手
        <i class="iconfont icon-xiajiantou1"></i>
    </div>
    <div class="hotSingerWrapper">

        <div class="hotSingerList" v-for="(item, index) in hotSingerList.artists" :key="index">
            <router-link :to="{name:'listSinger',params:{id:item.id}}">
                 

                
 
               
            <img :src="item.picUrl" alt="singer" class="singerImg">
        </router-link>
            <div class="singerName">{{item.name}}</div>
            <div class="play">
                    <div class="icon"> 
                        <van-icon name="play" />
                    </div>
               
                <div class="word">
                    play
                </div>
                

            </div>
        </div>



    </div>

    









</template>

<script setup>
import { getHotSinger } from '../../axios/routes/hotSingerAPI';
import {ref,reactive,onMounted,computed} from 'vue'

let hotSingerAPI
let hotSingerList=reactive({
    artists:[
        
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});


   ( async ()=>{
        try{
            hotSingerAPI=await getHotSinger()
            hotSingerList.artists=hotSingerAPI.data.artists
             /* console.log('ok',hotSingerList.artists[0])  */
        }
        catch(err){
            console.log(err)
        }
    }
    )()




        



</script>


<style scoped>
.icon{
    width: 3.5vw;
    height: 3.5vw;
    background-color: rgb(237, 227, 227);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1vw;
    margin-left: -1vw;
    margin-top: 0.5vw;
}
.word{
    width: 6vw;
    height: 3.5vw;
    
    
    display: flex;
    justify-content: center;
    align-items: center;
   
   
}
.iconfont{
    font-size: 2vw;
    color: rgb(113, 100, 100);
    margin-top: 1vw;
}
.title{
    color: rgb(113, 100, 100);
    margin-bottom: -2.5vw;
    margin-left: 3vw;
    margin-top: 1vw;

}

.test{
    width: 10vw;
    height: 5vw;
    background-color: rgb(237, 227, 227);
    overflow: auto;
    display: flex;
    flex-direction:column;
    flex-wrap: nowrap;
    
    justify-content: center;
}
    .hotSingerWrapper{
        display: flex;
        flex-direction: row;
        width:100vw;
        height: 40vw;
        margin: 2vw auto;
        overflow: auto;
        
        
    }
    .hotSingerList{
        width: 100vw;

        
    }
    .singerImg{
        width: 25vw;
        height: 25vw;
        border-radius: 4vw;
        margin: 1.5vw 2vw;
        border: 0.1vw solid #dbd4d4;
    }
    .singerName{
        margin: 0 2vw;
        width: 25vw;
        height: 4vw;
        display: flex;
        justify-content: center;
        align-content: center;
       
        overflow: auto;
        padding: 0 1vw;
    }

   

    .play{
        display: flex;
        align-items: center;
        justify-content: center;
    }





</style>