import { configureStore } from "@reduxjs/toolkit";
import obcSliceReducer from "./slice/obcSlice";
import { registerUserApi } from "./slice/addUserSlice";
import { obcCandidateApi } from "./slice/obcCndSlice";
import { authApi } from "../services/authService";
import authSliceReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    obc: obcSliceReducer,
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [obcCandidateApi.reducerPath]: obcCandidateApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      registerUserApi.middleware,
      obcCandidateApi.middleware,
      authApi.middleware
    );
  },
});
