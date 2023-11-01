<script setup>
import { getHotChineseSinger } from '../../../axios/routes/hotChineseSinger';
import {ref,reactive,onMounted,computed} from 'vue'
let hotChineseSingerAPI
let hotChineseSingerList=reactive({
    artists:[
        
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});
     
        (async ()=>{
            try{
                
                hotChineseSingerAPI=await getHotChineseSinger()
                hotChineseSingerList.artists=hotChineseSingerAPI.data.artists
                 /* console.log('ok',hotChineseSingerList.artists)   */
            }
            catch(err){
                console.log(err)
            }
        })()











</script>

<template>
    
<!--   {{ hotChineseSingerList.artists  }} -->

    <div class="header" >热门歌手</div>
    <div class="hotSingerListWrapper" >
         
        <div class="hotSingerList" v-for="(item, index) in hotChineseSingerList.artists" 
    :key="index" >
    
            <div class="hotSinger" v-if="index<5">
    
                 <div class="imgWrapper">
                    <router-link :to="{name:'listSinger',params:{id:item.id}}">
                 

                
                    <img :src="item.img1v1Url" alt="hotSingerPic" class="img">
                    </router-link>
                </div>

                <div class="artist">
                    {{item.name}}
                </div> 

                
                
               
                
                
                
            </div>
            
        </div>
      
    
       
    
    
    
    </div>
    
    
    
    
    </template>
    
    
    
    <style scoped>

    
    .header{
        background-color: #f5f5f5;
        font-size: large;
        font-family:serif;
    }
    
    .hotSingerListWrapper{
        height: 40vw;
        display: flex;
        overflow: auto;
        padding: 2% 1%;
        background-color: #f5f5f5;
      
    }
    .hotSinger{
        height: 40vw;
        margin: 0 2vw;
    }
    
    .imgWrapper{
        margin: 0 auto;
       
    }
    
    .name{
        margin: 0 auto;
        width: 30vw;
        height: 5vw;
        font-size: 1.5vw;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: center;
        color: #333333;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .artist{
        margin: 0 auto;
        width: 30vw;
        height: 5vw;
        
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: center;
        color: #999999;
        font-family: serif;
    }
    .img{
        width: 30vw;
        height: auto;
        border-radius: 2vw;
    }
    
    
    </style>
    