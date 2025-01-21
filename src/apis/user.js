import { request } from "@/utils";

//登录
export function loginAPI(formData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

//获取用户信息
export function getUserInfo() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
