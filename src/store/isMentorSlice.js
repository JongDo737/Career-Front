import { createSlice } from "@reduxjs/toolkit";

export const isMentorSlice = createSlice({
  name: "isMentor",
  initialState: {
    value: "",
  },
  reducers: {
    setIsMentor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsMentor } = isMentorSlice.actions;

export default isMentorSlice.reducer;
