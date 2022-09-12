import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { isAlertShown: false, alertMessage: "" };

const uiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openAlert: (previousState, action: PayloadAction<string>) => ({
      ...previousState,
      isAlertShown: true,
      alertMessage: action.payload,
    }),
    closeAlert: (previousState) => initialState,
    openLoading: (previousState) => ({ ...previousState, isAlertShown: true }),
    closeLoading: (previousState) => ({ ...previousState, isAlertShown: true }),
  },
});

export const {
  openAlert: openAlertActionCreator,
  closeAlert: closeAlertActionCreator,
  openLoading: openLoadingActionCreator,
  closeLoading: closeLoadingActionCreator,
} = uiSlice.actions;
export default uiSlice.reducer;
