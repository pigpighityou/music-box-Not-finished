<template>
  <van-nav-bar
    title="通知"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    class="navBar"
  />

  <van-tabs v-model:active="active" class="tab">
    <van-tab title="私信">
      <div class="msgWrapper">
        <div class="msg" v-for="(item, index) in content" :key="index">
          <!--  {{ item.id }} -->

          <div
            class="content"
            v-for="(childItem, childIndex) in item.content"
            :key="childIndex"
          >
            <el-card
              class="card"
              :body-style="{ padding: '0px' }"
              v-if="childIndex < 1"
            >
              <img :src="childItem.fromUser.avatarUrl" class="image" />
              <div class="chatLog">
                <div class="show">{{ childItem.fromUser.nickname }}</div>
                <div class="bottom">
                  <el-button text class="button" @click="showHandler(index)"
                    >详细消息</el-button
                  >
                </div>
              </div>
            </el-card>

            <div class="chatWrapper" v-if="show === index">
              <!-- 这边继续 -->
              <div class="chatDesc">
                <div class="img">
                  <img
                    :src="childItem.fromUser.avatarUrl"
                    alt="pic"
                    class="fromUserPic"
                  />
                </div>
                <div class="fromUserName">
                  {{ childItem.fromUser.nickname }}
                </div>
                <div class="publishTime">
                  {{ changeTime(childItem.time) }}
                </div>
              </div>

              <div class="chat">
                {{ JSON.parse(childItem.msg).msg }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="通知">
      {{ sendId }}
    </van-tab>
  </van-tabs>
  <div class="blank"></div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { showToast } from "vant";
import { getMsg } from "@/axios/routes/message.js";
import { getNotice } from "@/axios/routes/message.js";
import { getMsgContent } from "@/axios/routes/message.js";

const onClickLeft = () => history.back();
const active = ref(0);
const sendId = ref([]);
const msg = ref();
const notice = ref();
const content = ref([]);
const store = useStore();

watchEffect(async () => {
  if (active.value === 0) {
    // 因为切换私信和通知不是路由跳转，
    // 响应值随着你切换私信通知两个界面并不会自动清零
    // 所以每次进入页面都要手动清空之前的数据
    sendId.value = [];
    content.value = [];
    // 获取信息简述
    await getMsg().then((r) => {
      msg.value = r.data;
      /* console.log("msg", msg.value);   */
      store.state.msgCount = msg.value.newMsgCount;

      r.data.msgs.forEach((item) => {
        sendId.value.push(item.fromUser.userId);
      });
      /* console.log("sendId", sendId.value); */
    });
    // 获取信息具体内容
    sendId.value.forEach(async (item) => {
      await getMsgContent(item).then((r) => {
        content.value.push({
          id: item,
          content: r.data.msgs,
        });
      });
    });
    /*  console.log("content", content.value);  */
  } /* else if (active.value === 1) {
     sendId.value = [];
    content.value = [];
    await getNotice().then((r) => {
      notice.value = r.data;
      console.log("notice", notice.value);
    });
    await getMsgContent(id).then(() => {
      content.value = r.data;
      
      console.log("content", content.value);
    }); 
    console.log('功能暂未开放');
    showToast('功能暂未开放')
    active.value=0
  } */
});

// 控制对话框打开与否
const show = ref();
const showHandler = (index) => {
  if (show.value || show.value == 0) {
    show.value = null;
  } else {
    show.value = index;
  }
  /*  console.log(show.value); */
};

const changeTime = computed(() => {
  // 计算属性函数不能传参数，那么就在里面再套层函数
  // 给计算属性函数传参数实际上是给里面的函数传参数
  const formatTime = (param) => {
    let time = new Date(param);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    /*  console.log(year, month, day, hour, minute); */
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  return formatTime;
});
</script>

<style scoped>
.navBar {
  position: sticky;
  top: 0;
}

.blank {
  height: 20vw;
}

.card {
  width: 45vw;
  margin-top: 5vw;
  margin-left: 28vw;
  border-radius: 3vw;
  overflow: hidden;
}

.fromUserPic {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
}
.fromUserName {
  font-size: 4vw;
  margin-left: 5vw;
  max-width: 30vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.publishTime {
  font-size: 2.5vw;
  margin-left: 5vw;
  color: grey;
}

.chatWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chatDesc {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3vw;
}

.chatLog {
  padding: 3vw;
  display: flex;

  flex-direction: row;
}

.chat {
  background-color: rgb(240, 243, 246);
  padding: 2.5vw;
  width: 90vw;
  height: 16vw;
  font-size: 2.5vw;
  color: rgb(32, 30, 30);
  overflow: auto;
}

.show {
  width: 30vw;
  height: 10vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 3.2vw;
  margin-left: -5vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
