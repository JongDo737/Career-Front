import { createSlice } from "@reduxjs/toolkit";

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: "",
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
