<script setup>
import { getVIPInfo } from "@/axios/routes/vipInfo.js";

import { ref, reactive, computed, watchEffect } from "vue";

const drawer = ref(false);
const direction = ref("btt");

const userData = ref(JSON.parse(localStorage.getItem("userData")));
const id = ref(userData.value.userId);

let infoAPI;
const infoData = reactive({
  data: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  infoAPI = await getVIPInfo(id.value);
  infoData.data = infoAPI.data.data;
  /*  console.log('vipInfoOK',infoData.data);  */
  if (infoAPI.data.code != 200) {
    alert("登录过期，请重新登录！");
    router.push("/login");
  } else {
    return;
  }
})();

/* const time=reactive({
    associator:'',
    musicPackage:'',
    voiceBookVip:''
}) */

const time = ref({
  associator: "",
  musicPackage: "",
  voiceBookVip: "",
});

function dateCalc(value) {
  const now = ref(infoData.data.now);
  const expireTime = ref(infoData.data[value].expireTime);
  const totalMilliseconds = expireTime.value - now.value;
  if (totalMilliseconds < 0) {
    /*    console.log('已到期'); */
    time.value[value] = "已到期";
  } else {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    /* console.log(totalMilliseconds); */
    /* console.log(` ${days}天,  ${hours}小时,  ${minutes}分钟`); */
    time.value[value] = `${days}天,  ${hours}小时,  ${minutes}分钟`;
    /*   console.log('ok',time.associator,time.musicPackage,time.voiceBookVip); */
  }
}

watchEffect(() => {
  if (
    infoData.data.associator != null &&
    infoData.data.musicPackage != null &&
    infoData.data.voiceBookVip != null
  ) {
    dateCalc("associator");
    dateCalc("musicPackage");
    dateCalc("voiceBookVip");
  }
});
</script>

<template>
  <div class="infoWrapper" @click="drawer = true">
    <div class="info">
      <i class="iconfont icon-xiajiantou1">&nbsp;VIP中心</i>
    </div>
  </div>

  <el-drawer
    v-model="drawer"
    title="VIP中心 "
    :direction="direction"
    :before-close="handleClose"
    size="80%"
  >
    <div class="wrapper">
      <div class="words">
        <strong
          >请进入正常app充值
          <i class="iconfont icon-xiajiantou1"></i>
        </strong>
      </div>
      <div class="total">
        vip到期时间:<i class="iconfont icon-xiajiantou1"></i>
        <div class="time">
          {{ time.associator }}
        </div>
        <div class="level">等级：{{ infoData.data.associator.vipLevel }}</div>
      </div>

      <div class="musicPackage">
        音乐包到期时间:<i class="iconfont icon-xiajiantou1"></i>

        <div class="time">
          {{ time.musicPackage }}
        </div>
        <div class="level">等级：{{ infoData.data.musicPackage.vipLevel }}</div>
      </div>

      <div class="voiceBook">
        有声书包到期时间:<i class="iconfont icon-xiajiantou1"></i>

        <div class="time">
          {{ time.voiceBookVip }}
        </div>

        <div class="level">等级：{{ infoData.data.voiceBookVip.vipLevel }}</div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.iconfont {
  font-size: 3vw;
  margin-left: 4vw;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.wrapper div:not(.words) {
  margin-left: 4vw;
  font-size: 3vw;
  margin-top: 5vw;
  margin-bottom: 2vw;
}

.time {
  color: #ff0000;
  width: 60vw;
  height: 8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ff0000;
  border-radius: 1vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
}

.level {
  color: #100e0e;
  width: 60vw;
  height: 8vw;
}
</style>
