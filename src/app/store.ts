import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import handsSlice from "../features/hands/slices/handsSlice";
import uiSlice from "../features/ui/slices/uiSlice";
import userSlice from "../features/users/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    hands: handsSlice,
    ui: uiSlice,
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
