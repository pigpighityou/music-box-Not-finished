<template>
  <div class="searchWrapper">
    <div class="searchBox">
      <div class="search">
        <div class="selectIcon" @click="search">
          <i class="iconfont icon-jichu_sousuo1"></i>
        </div>

        <van-field
          v-model="username"
          name="search"
          label=""
          placeholder="搜索歌曲、歌手、专辑"
          class="select"
          @click="showPopup"
        />
      </div>

      <div class="listenRead">
        <i class="iconfont icon-yinle" @click="showToast('该功能暂未开通')"></i>
      </div>
    </div>
  </div>

  <el-dropdown ref="dropdown1" trigger="contextmenu" class="menuWrapper" :hide-on-click="true">
    <span class="el-dropdown-link">1234</span>
    <template #dropdown>
      <el-dropdown-menu class="menu">
        <el-dropdown-item class="item"
            v-for="(item, index) in suggestion.data"
            :key="index"
            @click="suggestSearch(item.keyword)">
            <svg
              class="searchIcon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
              ></path>
            </svg>
            {{ item.keyword }}
         
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSearch } from "@/axios/routes/search.js";
import { getSearchSuggest } from "@/axios/routes/search";
import store from "@/store/store.js";
import { showToast } from "vant";
const router = useRouter();
const route = useRoute();

const dropdown1 = ref();

// 搜索栏打开
function showClick() {
  if (!dropdown1.value) return;
  dropdown1.value.handleOpen();
}

// 搜索栏关闭
function showHide() {
  if (!dropdown1.value) return;
  dropdown1.value.handleClose();
}

const username = ref("");

const show = ref(false);
const showPopup = () => {
  show.value = true;
};

let suggestion = reactive({
  data: [],
});

// 搜索建议
watchEffect(() => {
  if (username.value) {
    /* console.log(username.value); */
    getSearchSuggest(username.value).then((res) => {
      suggestion.data = res.data.result.allMatch;
      /* console.log("suggestion", res.data.result.allMatch); */
    }).catch((err)=>{
        console.log(err)
    });
    showClick();
  } else {
    showHide();
  }
});

// 点击搜索建议栏内容后直接搜索
function suggestSearch(param) {
    
   showHide();
  username.value = param;
  search();
}

// 搜索内容
const search = async () => {
  const res = await getSearch(username.value);

  if (res.data !== null) {
    router.push({ name: "search", params: { id: username.value } });
  }
};
</script>

<style scoped>
.selectIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1.2);
  margin: 0 3%;
}

.select {
  width: 70vw;
  height: 100%;
  display: flex;
  margin-bottom: 1.5vw;
}
.menuWrapper {
  margin-top: -4.39vw;
}
.el-dropdown-link {
  margin-left: 45vw;
  margin-top: -4.5vw;
  z-index: -1;
}

.menu {
  width: 90vw;
  height: 60vw;
  display: flex;

  flex-direction: column;
  overflow: auto;
  border: 0.3vw black solid;
}

.itemWrapper {
    width: 90vw;
    height: 15vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin: 0% auto;
    overflow: hidden;
}



.searchIcon {
  width: 5vw;
  height: 5vw;
  margin-right: 2vw;
}

.searchWrapper {
  border: 0.5vw solid black;
  height: 10vw;
  display: flex;
  flex-direction: row;
  border-radius: 9vw;
  margin: 1% auto;
}
.searchBox {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search {
  width: 90vw;
  height: auto;
  margin: 0 1%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0% auto;
  overflow: hidden;
}

.listenRead {
  height: 100%;
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1.2);
}
</style>
