import { createSlice } from "@reduxjs/toolkit";
import { getToken, setUserToken, removeToken, getUserNewId } from "../../utils/auth";

const initialState = {
  token: getToken(),
  userInfo: null,
  role: null,
  newUserId: getUserNewId(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
    setAnnoyUser: (state, action) => {
      state.newUserId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      console.log("auth slice token: ", action.payload);
      setUserToken(action.payload.token, action.payload.expirationTime);
    },
    clearToken: (state) => {
      state.token = null;
      removeToken();
    },
  },
});

export const { setUserInfo, setToken, clearUserInfo, clearToken, setAnnoyUser } = authSlice.actions;

export default authSlice.reducer;
