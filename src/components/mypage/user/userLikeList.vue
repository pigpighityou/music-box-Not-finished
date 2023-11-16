<script setup>
import { getUserSongList } from "@/axios/routes/loginAPI.js";
/* import {getVIPTime} from '@/axios/routes/vipTime.js' */

import { ref, reactive, watchEffect } from "vue";

const userData = ref(JSON.parse(localStorage.getItem("userData")));

const active = ref(0);

let userSongListAPI;
let vipTimeAPI;

const userSongList = reactive({
  data: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

/* const vipTime=reactive({
    data:[],
    failImages:[
    'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
}); */

// 收藏和创建的order属性不同   喜欢的歌单和别的区别在于specailtype属性

watchEffect(() => {
  
  if (userData!=null) {
    (async () => {
      userSongListAPI = await getUserSongList(userData.value?.userId);
      if (userSongListAPI.data.code === 200) {
        userSongList.data = userSongListAPI.data.playlist;
        /*  console.log(userSongList.data);  */
      } else {
        return;
      }
    })();
  }
});

/* (async ()=>{
    vipTimeAPI=await getVIPTime()
   
        vipTime.data=vipTimeAPI.data.data
    console.log(vipTime.data);
}
     

)();
 */
</script>

<template>
  <div class="userLikeListWrapper">
    <div
      class="userLike"
      v-for="(item, index) in userSongList.data"
      :key="index"
    >
      <div
        class="judge"
        v-if="item.specialType === 5 && item.ordered === false"
      >
        <div class="picture">
          <router-link :to="{ name: 'listSong', params: { id: item.id } }">
            <img
              :src="item.coverImgUrl || userDetail.failImages[0]"
              alt="pic"
              class="pic"
            />
          </router-link>
        </div>

        <div class="songlistInfo">
          <div class="listName">
            {{ item.name }}
          </div>

          <div class="number">{{ item.trackCount }}首</div>
        </div>
      </div>
    </div>

    <van-tabs v-model:active="active">
      <van-tab title="创建的歌单">
        <div
          class="userCreate"
          v-for="(item, index) in userSongList.data"
          :key="index"
        >
          <div
            class="judge"
            v-if="item.specialType != 5 && item.ordered === false"
          >
            <div class="picture">
              <router-link :to="{ name: 'listSong', params: { id: item.id } }">
                <img
                  :src="item.coverImgUrl || userDetail.failImages[0]"
                  alt="pic"
                  class="pic"
                />
              </router-link>
            </div>

            <div class="songlistInfo">
              <div class="listName">
                {{ item.name }}
              </div>

              <div class="number">
                <div class="num">{{ item.trackCount }}首</div>
                <div class="playCount">
                  &nbsp;&nbsp;播放{{
                    item.playCount < 10000
                      ? item.playCount
                      : (item.playCount / 10000).toFixed(1) + "万"
                  }}次
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="收藏的歌单">
        <div
          class="userTreasure"
          v-for="(item, index) in userSongList.data"
          :key="index"
        >
          <div class="judge" v-if="item.ordered === true">
            <div class="picture">
              <router-link
                :to="{ name: 'listSong', params: { id: item.id } }"
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="clickHandler()"
              >
                <img
                  :src="item.coverImgUrl || userDetail.failImages[0]"
                  alt="pic"
                  class="pic"
                />
              </router-link>
            </div>

            <div class="songlistInfo">
              <div class="listName">
                {{ item.name }}
              </div>

              <div class="number">
                <div class="num">{{ item.trackCount }}首</div>
                <div class="creator">
                  &nbsp;&nbsp;By {{ item.creator.nickname }}
                </div>
                <div class="playCount">
                  &nbsp;&nbsp;播放{{
                    item.playCount < 10000
                      ? item.playCount
                      : (item.playCount / 10000).toFixed(1) + "万"
                  }}次
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.userLikeListWrapper {
  margin-top: 2vw;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 7vw;
  border-radius: 4vw;
  width: 98vw;

  overflow: auto;
}

.judge {
  display: flex;
  flex-direction: row;
  margin-top: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  border-radius: 4vw;
  width: 96vw;
  height: 30vw;
  background-color: #ffffff;
  box-shadow: 0 0 0.5vw #dcdcdc;
}

.userCreate {
  display: flex;
  flex-direction: row;
}

.userTreasure {
  display: flex;
  flex-direction: row;
}

.userLike {
  display: flex;
  flex-direction: row;
  margin-bottom: 1vw;
  margin-top: 1vw;
}

.songlistInfo {
  display: flex;
  flex-direction: column;
}

.listName {
  font-size: 4vw;
  font-weight: bold;
  margin-top: 2vw;
  margin-left: 1vw;
  margin-right: 1vw;
  width: 60vw;
  height: 10vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.number {
  font-size: 3vw;
  margin-top: 17vw;
  margin-left: 1vw;
  margin-right: 1vw;
  width: 60vw;
  height: 10vw;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
}

.pic {
  width: 30vw;
  height: 30vw;
  border-radius: 4vw;
}
</style>
