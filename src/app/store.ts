import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import alertSlice from "../features/users/slices/alertSlice";
import userSlice from "../features/users/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
