<template>
  <!-- title -->
  <van-nav-bar title="更多" left-text="" left-arrow @click-left="onClickLeft">
    <template #right>
      <router-link to="/singer">
        <van-icon name="music-o" size="18" />
      </router-link>
    </template>
  </van-nav-bar>

  <!-- 别的组件 -->

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp

  <router-link to="/login">
    <button class="test">登录</button>
  </router-link>

  <!--设置选项 点击弹出  -->
  <button class="test" @click="drawer1 = true">制作详情</button>

  <el-drawer
    v-model="drawer1"
    title="制作详情"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="intro">
      <strong>制作人:</strong>pigpighityourhead <br />
      <strong>制作时间:</strong>2023-10 <br />
      <strong>开发环境:</strong>
      <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      vue3.0+vant+element-plus+vue-router+vuex+axios+vueuse+iconfont+网易云音乐api
      <br />
      <div class="blank"></div>
    </div>
  </el-drawer>

  <button class="test" @click="out">退出登录</button>

  <button class="test" @click="getStatus">
    登录状态: {{ userData ? "已登录" : "未登录" }}
  </button>
</template>

<script setup>
import { ref, reactive } from "vue";

import { loginOut } from "@/axios/routes/loginAPI.js";
import { useRouter } from "vue-router";
// vant
const onClickLeft = () => history.back();

// element-plus
const drawer1 = ref(false);
const direction = ref("ttb");

const router = useRouter();

const userData = ref(localStorage.getItem("userData"));
const getStatus = () => {
  if (localStorage.getItem("userData")) {
    alert("已登录");
  } else {
    alert("未登录");
  }
};

const out = async () => {
  alert("退出登录");
  let r = await loginOut();
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("cookie");
  router.go(0);
  /*  console.log(r); */
};
</script>

<style scoped>
.test {
  width: 90vw;
  height: 10vw;
  margin-top: 2vw;
  margin-left: 5vw;
  background-color: rgb(255, 252, 252);
  border: 0.2px solid black;
  border-radius: 1.5vw;
}
</style>
