<script setup>
import { ref, reactive } from "vue";

// vant
const onClickLeft = () => history.back();

// element-plus
const drawer1 = ref(false);
const direction = ref("btt");
</script>

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

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放点之前的，别的组件

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
    </div>
  </el-drawer>

  <router-link to="">
    <button class="test">退出登录</button>
  </router-link>
</template>

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
