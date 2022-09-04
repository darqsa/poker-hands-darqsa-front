import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { isAlertShown: false, alertMessage: "" };

const alertSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openAlert: (previousState, action: PayloadAction<string>) => ({
      ...previousState,
      isAlertShown: true,
      alertMessage: action.payload,
    }),
    closeAlert: (previousState) => initialState,
  },
});

export const {
  openAlert: openAlertActionCreator,
  closeAlert: closeAlertActionCreator,
} = alertSlice.actions;
export default alertSlice.reducer;
