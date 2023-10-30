<script setup>
import { getGoodSongList } from '../../../axios/routes/goodSongAPI';
import {getListSong } from '@/axios/routes/getListSong.js'
import {ref,reactive,onMounted,computed} from 'vue'

let goodSongsAPI
let getListSongAPI

let goodSongsList=reactive({
    songs:[
        
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});

let listSong=reactive({
    data:[],
    failImages:[
    'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});


    (async ()=>{
        try{
            goodSongsAPI=await getGoodSongList()
            goodSongsList.songs=goodSongsAPI.data
              /*  console.log('ok',goodSongsList.songs)  */  
        }
        catch(err){
            console.log(err)
        }
    })();

  const getSong= async (id)=>{
        try{

            getListSongAPI=await getListSong(id)
            listSong.data=getListSongAPI.data
             /*  console.log('okDetail',listSong.data)   */
        }
        catch(err){
            console.log(err)
        }
    };



    

  











</script>


<template>




    <div class="goodSongsWrapper">
            <div class="title">
                精品歌单
                <i class="iconfont icon-jiantouyou"></i>
            </div>

            <div class="goodSongs">
                <div class="goodSong" v-for="(item, index) in goodSongsList.songs.playlists" :key="index">

                        <router-link :to="{name:'listSong',params:{id:item.id}}">
                            <img :src="item.coverImgUrl" alt="img" class="img" >
                        </router-link>
                    

                    <div class="name">{{item.name}}</div>
                   <!--  <div class="test">{{ item.id }}</div> -->


                  

                </div>

            </div>
   </div>


  






</template>



<style scoped>
.goodSongsWrapper{
    width: 100vw;
    height: 53vw;
    display: flex;
    flex-direction: column;
    margin: 1.5vw 0;
 
}

.title{
    background-color: white;
    width: 95vw;
    height: 8.5vw;
    font-size: 4vw;
    padding: 0 auto;
    margin: 0 auto ;
    margin-top: 4vw;
    color: black;
   
}

.goodSongs{
    width: 95vw;
    height: 45vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: auto;
    margin: 0 auto ;
    color: black;
}

.img{
    width: 30vw;
    height: 30vw;
    background-color: red;
    margin: 0 1vw;
    border-radius:4.5vw;
}

</style>