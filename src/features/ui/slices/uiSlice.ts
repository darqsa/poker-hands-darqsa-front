import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAlertShown: false,
  isLoadingShown: false,
  alertMessage: "",
};

const uiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openAlert: (previousState, action: PayloadAction<string>) => ({
      ...previousState,
      isAlertShown: true,
      alertMessage: action.payload,
    }),
    closeAlert: (previousState) => ({
      ...previousState,
      isAlertShown: initialState.isAlertShown,
      alertMessage: initialState.alertMessage,
    }),
    openLoading: (previousState) => ({
      ...previousState,
      isLoadingShown: true,
    }),
    closeLoading: (previousState) => ({
      ...previousState,
      isLoadingShown: initialState.isLoadingShown,
    }),
  },
});

export const {
  openAlert: openAlertActionCreator,
  closeAlert: closeAlertActionCreator,
  openLoading: openLoadingActionCreator,
  closeLoading: closeLoadingActionCreator,
} = uiSlice.actions;
export default uiSlice.reducer;
