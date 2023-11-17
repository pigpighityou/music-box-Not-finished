<template>
  <div class="userWrapper">
    <div class="user">
      <div class="userPicture">
        <img
          :src="userLogin.data.profile?.avatarUrl || userLogin.failImages"
          alt="user"
          class="pic"
        />
      </div>

      <div class="userInfo">
        <div class="userId">
          <svg
            class="userPic"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
            ></path>
          </svg>
          <div class="id">
            {{ userLogin.data.profile?.nickname || undefined }}
          </div>
        </div>

        <div class="otherInfo">
          <svg
            class="vipPic"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M512 896a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
            ></path>
            <path
              fill="currentColor"
              d="M576 128H448v200a286.72 286.72 0 0 1 64-8c19.52 0 40.832 2.688 64 8V128zm64 0v219.648c24.448 9.088 50.56 20.416 78.4 33.92L757.44 128H640zm-256 0H266.624l39.04 253.568c27.84-13.504 53.888-24.832 78.336-33.92V128zM229.312 64h565.376a32 32 0 0 1 31.616 36.864L768 480c-113.792-64-199.104-96-256-96-56.896 0-142.208 32-256 96l-58.304-379.136A32 32 0 0 1 229.312 64z"
            ></path>
          </svg>
          <div class="id2">
            <div
              class="isVip"
              v-if="userLogin.data.profile?.vipType || undefined"
            >
              音乐会员 level:{{ vipLevel }}
            </div>
            <div class="isVip" v-else="!userLogin.data.profile.vipType">
              非会员
            </div>
          </div>
        </div>
      </div>

      <div class="userSub">
        <div class="subscribe">关注 {{ userLogin.data.profile?.follows }}</div>

        <div class="fans">粉丝 {{ userLogin.data.profile?.followeds }}</div>

        <div class="level">等级 {{ userLogin.data.level }}</div>
      </div>
    </div>

    <div class="others">
      <div class="other1">VIP成长值 {{ vipGrowth }}</div>

      <div class="other1">
        <vipTask></vipTask>
      </div>

      <div class="other1">
        <vipCenter></vipCenter>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import vipTask from "./components/vipTask.vue";
import vipCenter from "./components/vipCenter.vue";
import { getLoginUser } from "@/axios/routes/loginAPI.js";
import { getVIPGrow } from "@/axios/routes/vipAPI.js";

const userData = ref(JSON.parse(localStorage.getItem("userData")));
const token = ref(localStorage.getItem("token"));
/* console.log('data',userData.value); */
/* console.log('token',token.value); */

const userLogin = reactive({
  data: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

const vipGrowth = ref();
const vipLevel = ref();

(async () => {
  if (userData.value && token.value) {
    let res = await getLoginUser(userData.value.userId);
    userLogin.data = res.data;
    /* console.log('ok',userLogin.data);  */

    if (res.data.code != 200) {
      alert("登录过期，请重新登录！");
      router.push("/login");
    } else {
      return;
    }
  }
})();

(async () => {
  if (userData.value && token.value) {
    let res = await getVIPGrow();
    vipGrowth.value = res.data.data.userLevel.growthPoint;
    vipLevel.value = res.data.data.userLevel.level;
    /* console.log('ok',res.data.data);
       console.log(res.data.data.levelCard); */
    if (res.data.code != 200) {
      alert("登录过期，请重新登录！");
      router.push("/login");
    } else {
      return;
    }
  }
})();
</script>

<style scoped>
.userWrapper {
  width: 96vw;
  height: 50vw;
  background-color: rgb(245, 245, 245);
  border-radius: 5vw;
  margin-top: 3vw;
  margin-left: 2vw;
  margin-right: 2vw;
}

.user {
  display: flex;
  flex-direction: row;
}

.userPicture {
  display: flex;
  align-items: center;
}

.userId {
  width: 43vw;
  height: 10vw;
  background-color: white;
  margin-bottom: 1vw;
  margin-top: 3vw;
  display: flex;
  flex-direction: row;
}

.otherInfo {
  width: 43vw;
  height: 10vw;
  background-color: white;
  margin-bottom: 1vw;
  margin-top: 3vw;
  display: flex;
  flex-direction: row;
}

.userPic {
  margin-top: 1vw;
  width: 7vw;
  height: 7vw;
}

.vipPic {
  margin-top: 1vw;
  width: 7vw;
  height: 7vw;
}

.id {
  margin-left: 1vw;
  margin-top: 1vw;
  width: 34vw;
  height: 8vw;

  display: flex;
  align-items: center;
  justify-content: center;
}

.id2 {
  margin-left: 1vw;
  margin-top: 1vw;
  width: 34vw;
  height: 8vw;

  display: flex;
  align-items: center;
  justify-content: center;
}

.userSub {
  margin-left: 1.3vw;
  overflow: hidden;
  width: 27vw;
  height: 21vw;
  background-color: white;
  margin-bottom: 1vw;
  margin-top: 4vw;
  border-radius: 2vw;
}

.subscribe {
  width: 25vw;
  height: 5.5vw;

  margin-left: 1vw;
  margin-top: 1vw;
}

.fans {
  width: 25vw;
  height: 5.5vw;

  margin-left: 1vw;
  margin-top: 1vw;
}

.level {
  width: 25vw;
  height: 5.5vw;

  margin-left: 1vw;
  margin-top: 1vw;
}

.pic {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  margin: 2vw;
}

.other {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.other1 {
  min-width: 30vw;

  height: 14vw;
  margin-left: 3vw;
  margin-top: 4vw;
  border-radius: 2.5vw;
}

.others {
  display: flex;
  flex-direction: row;
}
</style>
