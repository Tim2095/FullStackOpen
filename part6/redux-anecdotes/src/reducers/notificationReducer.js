import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Hello World",
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
  },
});

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
