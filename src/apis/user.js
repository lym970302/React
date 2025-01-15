import { request } from "@/utils";

//登录
export function loginAPI(loginForm) {
  return request({
    url: "/authorizations",
    method: "POST",
    date: loginForm,
  });
}

//获取用户信息
export function getUserInfo() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
