import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store.js";
import { nextTick } from "vue";

const routes = [
  // component以对象名义写的时候，一定要加s
  {
    path: "/",
    components: {
      default: () =>
        import("../components/homePage/public/publicComponent.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/search/:id",
    name: "search",
    components: {
      default: () =>
        import("../components/search/components/searchContent.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/footBar",
    components: {
      footBar: () => import("../components/public/footBar.vue"),
    },
  },

  {
    path: "/singer",
    name: "singer",
    components: {
      default: () => import("../pages/public/singer.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/hotSongList",
    name: "hotSongList",
    components: {
      default: () => import("../pages/public/hotListSong.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/recSongList",
    name: "recSongList",
    components: {
      default: () => import("../pages/public/recListSong.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/listSinger/:id",
    name: "listSinger",
    components: {
      default: () => import("../pages/public/listSinger.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/hotListSinger",
    name: "hotListSong",
    components: {
      default: () => import("../pages/public/hotListSinger.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/listSong/:id",
    name: "listSong",
    components: {
      default: () => import("../pages/public/listSong.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/album/:id",
    name: "album",
    components: {
      default: () => import("../pages/public/album.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/dailyRec",
    components: {
      default: () => import("../pages/public/dailyRec.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/ad",
    components: {},
  },
  {
    path: "/ad1/:id",
    name: "adContent",
    components: {
      default: () => import("../components/public/adContent.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/world",
    components: {
      default: () => import("../pages/homePage/world.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
    name: "world",
  },

  {
    path: "/Chinese",
    components: {
      default: () => import("../components/homePage/Chinese.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
    name: "Chinese",
  },
  {
    path: "/Japan",
    components: {
      default: () => import("../components/homePage/Japan.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
    name: "Japan",
  },
  {
    path: "/Korea",
    components: {
      default: () => import("../components/homePage/Korea.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
    name: "Korea",
  },
  {
    path: "/English",
    components: {
      default: () => import("../components/homePage/English.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
    name: "English",
  },

  {
    path: "/user",
    name: "user",
    components: {
      default: () => import("../pages/myPage/myPage.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
  },

  {
    path: "/user/:id",
    components: {
      /* default: () => import('../components/homePage/public/publicComponent.vue'),
            radio: () => import('../components/homePage/radio.vue'), */
    },
  },

  {
    path: "/recentSongs",
    name: "recentSongs",
    components: {
      default: () => import("../pages/public/recentSongs.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/storeItem",
    name: "storeItem",
    components: {
      default: () => import("../pages/public/storeItem.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/localStore",
    name: "localStore",
    components: {
      default: () => import("../pages/public/localStore.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/storeRadio",
    name: "storeRadio",
    components: {
      default: () => import("../pages/public/storeRadio.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/storeRadioItem/:id",
    name: "storeRadioItem",
    components: {
      default: () => import("../components/public/storeRadioItem.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },

  {
    path: "/mv",
    components: {
      default: () => import("../pages/mv/mv.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
  },
  {
    path: "/mvPlayer/:id",
    name: "mvPlayer",
    components: {
      default: () => import("../pages/mv/mvPlayer.vue"),
    },
  },
  {
    path: "/mvPlayerAlias/:id",
    name: "mvPlayerAlias",
    components: {
      default: () => import("../pages/mv/mvPlayerAlias.vue"),
    },
  },

  {
    path: "/mv/category",
    components: {
      default: () => import("../components/mv/body/categoryContent.vue"),
    },
    /* children:[
            {
                path:'hello',
                components:{
                    default:()=>import('../components/mv/body/goodMv.vue')
                }
            }
        ] */
  },

  {
    path: "/mv/good",
    components: {
      default: () => import("../components/mv/body/goodContent.vue"),
    },
  },
  {
    path: "/mv/rec",
    components: {
      default: () => import("../components/mv/body/recContent.vue"),
    },
  },
  {
    path: "/radio",
    components: {
      default: () => import("../pages/radio/radio.vue"),
      footBar: () => import("../components/public/footBar.vue"),
    },
  },
  {
    path: "/more",
    components: {
      default: () => import("../components/mypage/header/more.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/msg",
    name: "msg",
    components: {
      default: () => import("../components/mypage/header/msg.vue"),
      musicPlayer: () => import("../components/musicPlayer/musicPlayer.vue"),
    },
  },
  {
    path: "/login",
    /*  beforeEnter: (to, from, next) => {
            if(store.state.isLogin){
                next('/world')
        }else{
            next('/user')
        }
                                        }
        , */
    components: {
      default: () => import("../components/login/login.vue"),
    },
  },
  {
    path: "/loginAlias",
    name: "loginAlias",
    components: {
      default: () => import("../components/login/loginAlias.vue"),
    },
  },
  {
    path: "/loginSuccess",
    redirect: (to) => {
      return {
        path: "/user",
      };
    },
  },
  {
    path: "/loginOut",
    name: "loginOut",
    redirect: (to) => {
      return {
        path: "/user",
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 如果该页面有footbar，将标记传给store，然后再传给组件，进行dom更改
router.beforeEach((to, from, next) => {
  const footbar = to.matched.some((route) => "footBar" in route.components);
  if (footbar) {
    store.state.hasFootBar = true;
  } else {
    store.state.hasFootBar = false;
  }
  console.log("hasFootBar?", store.state.hasFootBar);
  next();
});



export default router;
