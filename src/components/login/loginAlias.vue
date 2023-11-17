<template>
  <van-nav-bar
    title="登录页面"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  >
  </van-nav-bar>

  <div class="loginWrapper"></div>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="phoneNum"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1\d{10}$/, message: '手机号格式错误' },
        ]"
      />
      <van-field
        v-model="captcha"
        type="captcha"
        name="captcha"
        label="验证码"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{4}$/,
            message: '验证码格式错误',
          },
        ]"
      />
    </van-cell-group>
    <div class="captchaWrapper">
      <div class="getCaptcha" @click="getCaptcha">获取验证码</div>
      <router-link to="/login">
        <div class="captcha">切换至密码登录</div>
      </router-link>
    </div>

    <div style="margin: 4px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getLoginCaptcha } from "@/axios/routes/loginAPI.js";
import { setLocalStorage } from "@/lib/localStorageUse";
import { getPhoneCaptcha } from "@/axios/routes/loginAPI.js";
import { useRouter, useRoute } from "vue-router";

import store from "@/store/store.js";
import { set } from "lodash";
const router = useRouter();
const route = useRoute();
const onClickLeft = () => history.back();

const username = ref("");
const captcha = ref("");

const onSubmit = async (values) => {
  /*  console.log("submit", values); */

  try {
    let res = await getLoginCaptcha(values);
    alert("登录成功！");
    store.state.userData = res.data;
    store.state.token = res.data.token;
    store.state.isLogin = true;
    setLocalStorage("userData", res.data.profile);
    setLocalStorage("token", res.data.token);
    setLocalStorage("cookie", res.data.cookie);

    router.push("/loginSuccess");
  } catch (e) {
    console.log(e);
    alert("账号或验证码错误！");
    captcha.value = "";
  }
};

const getCaptcha = async () => {
  
  let res = await getPhoneCaptcha(username.value);

  console.log(res);
  if (res.data.code != 200) {
    alert("获取验证码失败！");
  } else {
    alert("获取验证码成功！");
  }
};
</script>

<style scoped>
.captchaWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.getCaptcha {
  margin: 16px;
  text-align: left;
  color: #1989fa;
}
.captcha {
  margin: 16px;
  text-align: right;
  color: #1989fa;
}
</style>
