<script setup>
import { ref, reactive, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMv } from "../../../axios/routes/mv";

const country = reactive([
  {
    name: "全部",
    id: 0,
  },
  {
    name: "内地",
    id: 1,
  },
  {
    name: "港台",
    id: 2,
  },
  {
    name: "欧美",
    id: 3,
  },
  {
    name: "日本",
    id: 4,
  },
  {
    name: "韩国",
    id: 5,
  },
]);

let mvAPI;
let mv = reactive({
  lists: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

const onClickLeft = () => history.back();

const num = ref(null);

const active = ref(0);

const select = ref("全部");

(async () => {
  mvAPI = await getMv(select.value);
  mv.lists = mvAPI.data.data;
  /*  console.log(mv.lists)  */
})();

const change = async () => {
  mvAPI = await getMv(select.value);
  mv.lists = mvAPI.data.data;
  /*  console.log(mv.lists) */
};

const changeCountry = () => {
  switch (active.value) {
    case 0:
      select.value = "全部";
      change();

      break;
    case 1:
      select.value = "内地";
      change();
      break;
    case 2:
      select.value = "港台";
      change();
      break;
    case 3:
      select.value = "欧美";
      change();
      break;
    case 4:
      select.value = "日本";
      change();
      break;
    case 5:
      select.value = "韩国";
      change();
      break;
    default:
      select.value = "全部";
      break;
  }
};

const route = useRoute();
const router = useRouter();

const fullscreenLoading = ref(false);

const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 500);
};

// 当弃掉了遮罩层，加载，路由到新的视频播放界面
watchEffect(() => {
  if (num.value || num.value == 0) {
    setTimeout(() => {
      openFullScreen1();
    }, 300);

    setTimeout(() => {
      router.push({ name: "mvPlayer", params: { id: mv.lists[num.value].id } });
    }, 800);
  }
});
</script>

<template>
  <van-nav-bar
    title="mv分类合集"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    fixed="true"
    placeholder="true"
    class="navbar"
  />

  <div class="header">
    <van-tabs
      v-model:active="active"
      animated
      border="true"
      @click-tab="changeCountry"
    >
      <van-tab v-for="(item, index) in country" :title="item.name">
        <div
          class="categoryWrapper"
          v-for="(item, index) in mv.lists"
          :key="index"
        >
          <div class="categoryInner">
            <div
              class="categoryPic"
              @click="num = index"
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-text="拼命加载中..."
            >
              <img :src="item.cover" alt="" class="img" />
            </div>

            <div class="categoryWord">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="singer">
                {{ item.artistName }}
              </div>
            </div>
            <div class="overlay" v-if="index != num"></div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.navbar {
  position: relative;
  z-index: 9999999;
}

.overlay {
  width: 100%;
  height: 99%;
  border-radius: 2vw;
  background-color: rgba(0, 0, 0, 0.35);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  pointer-events: none;
}

.img {
  width: 100vw;
  height: 55vw;
  border-radius: 1vw;
}
.categoryInner {
  position: relative;
  margin-top: 0.5vw;
}

.name {
  font-size: 4vw;
  font-weight: 800;
  margin-bottom: 1vw;
  color: white;
  position: absolute;
  top: 8vw;
  left: 4vw;
  z-index: 99;
}

.singer {
  font-size: 2.5vw;
  font-weight: 500;
  color: white;
  position: absolute;
  top: 4vw;
  left: 2vw;
  z-index: 99;
}
</style>
