import { configureStore } from "@reduxjs/toolkit";
import isMentorReducer from "./isMentorSlice";
import isLoginReducer from "./isLoginSlice";
export default configureStore({
  reducer: {
    isMentor: isMentorReducer,
    isLogin: isLoginReducer,
  },
});
