<script setup>
import { ref, reactive } from "vue";
import { getVIPTask } from "@/axios/routes/vipTask.js";
const drawer = ref(false);
const direction = ref("btt");

let vipTaskAPI;
const vipTaskData = reactive({
  data: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  vipTaskAPI = await getVIPTask();
  vipTaskData.data = vipTaskAPI.data.data;
  /* console.log('taskOK',vipTaskData.data);
    console.log(vipTaskAPI.data.data.taskList[0].taskItems); */
  if (vipTaskAPI.data.code != 200) {
    alert("登录过期，请重新登录！");
    router.push("/login");
  } else {
    return;
  }
})();
</script>

<template>
  <div class="taskWrapper" @click="drawer = true">
    <div class="task">
      <i class="iconfont icon-xiajiantou1">&nbsp;VIP任务</i>
    </div>
  </div>

  <el-drawer
    v-model="drawer"
    title="VIP任务列表 "
    :direction="direction"
    :before-close="handleClose"
    size="60%"
  >
    <div class="total">
      <strong> 总分 {{ vipTaskAPI.data.data.taskScore }} </strong>
      (请在正式app上操作)
    </div>
    <div
      class="taskList"
      v-for="(item, index) in vipTaskAPI.data.data.taskList[0].taskItems"
      :key="index"
    >
      {{ item.action }}--{{ item.description }}
      <img :src="item.iconUrl" alt="pic" class="pic" />
    </div>
  </el-drawer>
</template>

<style scoped>
.taskWrapper {
  margin-left: 4vw;
}

.iconfont {
  font-size: 3.2vw;
  margin-bottom: 2vw;
  margin-right: 1vw;
}

.taskList {
  margin-left: 2vw;
  margin-top: 4vw;
  font-size: 2.5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.pic {
  width: 5vw;
  height: 5vw;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 2vw;
}
</style>
