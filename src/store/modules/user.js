import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, getUserInfo } from "@/apis/user";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

//异步获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    dispatch(setToken(res.date.token));
  };
};

//异步获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfo();
    dispatch(setUserInfo(res.date));
  };
};

//按需导出
export { fetchLogin, fetchUserInfo, clearUserInfo };

//默认导出reducer
export default userReducer;
