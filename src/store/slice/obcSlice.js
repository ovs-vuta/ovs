import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_URL;

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const OBCSlice = createSlice({
  name: "obc",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // addOBC: (state, action) => {
    //   state.value.push(action.payload);
    //   // console.log(action.payload)
    // },
    // groupObcData:(state,action)=>{}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOBC.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchAllOBC.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchAllOBC.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { addOBC, groupObcData } = OBCSlice.actions;

export default OBCSlice.reducer;

export const fetchAllOBC = createAsyncThunk("obc/fetch", async () => {
  const controller = new AbortController();
  const signal = controller.signal
  const response = await fetch(`${API}/users/all-candidates`,{signal:signal});
  const resData = await response.json();
  console.log(resData)
  return resData.data;
});
