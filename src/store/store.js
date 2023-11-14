import { createStore } from "vuex";
import { watch, watchEffect } from "vue";
import { getLyric } from "../axios/routes/getLyric";

const store = createStore({
  state() {
    return {
      // 登录状态
      isLogin: false,
      token: "",
      userData: {},

      // 是否有footbar
      hasFootBar: false,

      // 播放状态
      isPlayingSong: false,
      playSong: {},
      lyric: "",
      url: "",
      playList: [],
      playIndex: "",
      audioState: {},

    

    };
  },

  getters: {
     lyrics(state) {
     
        const lyricTotal = state.lyric;
        const lyricArr = lyricTotal.split("\n");

        const lyricFinal = [];

        lyricArr.forEach((item, index) => {
          const time = item.match(/\[\d{2}:\d{2}.\d{2}\]/g);
          if (time) {
            const lyric = item.split(time)[1];
            // 把时间里的分，秒，放入一个数组里 timeArr[0]为分，timeArr[1]为秒
            const timeArr = time[0].match(/\d{2}:\d{2}/g)[0].split(":");
            // 目前时间的计算，换算成秒
            const timeFinal = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
            lyricFinal.push({
              time: timeFinal,
              lyric: lyric,
            });
            // 在歌词对象里，得加一个上一个歌词对象的时间属性，
            //否则无法判断歌词的时间范围
            lyricFinal.forEach((item2, index2) => {
              if (index2 === lyricFinal.length - 1) {
                item2.nextTime = 999999999;
              } else {
                // 把下一个对象的时间给该对象的nextTime属性
                item2.nextTime = lyricFinal[index2 + 1].time;
              }
            });
          }
         
        });
        
        return lyricFinal;
    
    }, 
  },

  mutations: {
    // 获取歌单里的歌曲详情，别忘了加上state
    getIndexPlay(state, index) {
      // this可以不加
      this.state.playIndex = index;
      this.state.playSong = state.playList[index];
      this.state.isPlayingSong = false;
      // 获取歌词
      store.dispatch(
        "getLyricHandler",
        this.state.playSong.id || this.state.playSong.resourceId
      )
      
    },
   

  },

  actions: {
    // 异步获取歌词 context参数说明需要在内部调用
    getLyricHandler(context, id) {
      getLyric(id).then((res) => {
        context.state.lyric = res.data.lrc.lyric;
       
        /*   console.log(context.state.lyric);  */
       
      })
    },
  },
  
});

export default store;
