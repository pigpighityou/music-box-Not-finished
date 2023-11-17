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
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          // 密码在6-20位,不能全是字母或数字或规定符号
          {
            pattern:
              /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_!.,~]+$)[0-9A-Za-z_!.,~]{6,20}$/,
            message: '密码格式错误',
          },
        ]"
      />
    </van-cell-group>
    <router-link to="/loginAlias">
      <div class="captcha">切换至验证码登录</div>
    </router-link>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from "vue";
import { getLoginPhone } from "@/axios/routes/loginAPI.js";
import { useRouter, useRoute } from "vue-router";

import store from "@/store/store.js";
const router = useRouter();
const route = useRoute();
const onClickLeft = () => history.back();

const username = ref("");
const password = ref("");

const onSubmit = async (values) => {
  /*   console.log("submit", values); */

  let res = await getLoginPhone(values);

  console.log(res);
  if (res.data.code != 200) {
    password.value = "";
    alert("账号或密码错误！");
  } else {
    alert("登录成功！");
    store.state.userData = res.data;
    store.state.token = res.data.token;
    store.state.isLogin = true;

    localStorage.setItem("userData", JSON.stringify(res.data.profile));
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("cookie", res.data.cookie);

    router.push("/loginSuccess");
  }
};
</script>

<style scoped>
.captcha {
  margin: 16px;
  text-align: right;
  color: #1989fa;
}
</style>
