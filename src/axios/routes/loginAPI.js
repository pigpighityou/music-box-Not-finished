import root from "../index";

export function getLoginPhone(data) {
  return root({
    method: "GET",
    url: `/login/cellphone?phone=${data.phoneNum}&password=${data.password}`,
  });
}

export function getPhoneCaptcha(data) {
  return root({
    method: "GET",
    url: `/captcha/sent?phone=${data}`,
  });
}

export function getLoginCaptcha(data){
  return root({
    method: "GET",
    url: `/login/cellphone?phone=${data.phoneNum}&captcha=${data.captcha}`,

  });
}

export function verifyCaptcha(data){
  return root({
    method: "GET",
    url: `/captcha/verify?phone=${data.phoneNum}&captcha=${data.captcha}`,
  });
}

export function loginOut() {
  return root({
    method: "GET",
    url: `/logout`,
  });
}

export function loginStatus() {
  return root({
    method: "GET",
    url: `/login/status`,
   
  });
}

export function getLoginUser(data) {
  return root({
    method: "GET",
    url: `/user/detail?uid=${data}`,
  });
}

export function getLoginUserAccount() {
  return root({
    method: "GET",
    url: `/user/account`,
  });
}

export function getLoginUserDetail() {
  return root({
    method: "GET",
    url: `/user/subcount`,
  });
}

export function getLoginUserLevel() {
  return root({
    method: "GET",
    url: `/user/level`,
  });
}

export function getLoginUserbindInfo(id) {
  return root({
    method: "GET",
    url: `/user/binding?uid=${id}`,
  });
}

export function getUserSongList(id) {
  return root({
    method: "GET",
    url: `/user/playlist?uid=${id}`,
  });
}
