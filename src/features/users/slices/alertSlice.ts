import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const alertSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleAlert: (previousState) => !previousState,
  },
});

export const { toggleAlert: toggleAlertActionCreator } = alertSlice.actions;
export default alertSlice.reducer;
