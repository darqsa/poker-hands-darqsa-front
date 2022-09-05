import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HandData } from "../models/Hand";

const initialState: HandData[] = [];

const handsSlice = createSlice({
  name: "hands",
  initialState,
  reducers: {
    loadHands: (previousUsers, action: PayloadAction<HandData[]>) => [
      ...action.payload,
    ],
  },
});

export const { loadHands: loadHandsActionCreator } = handsSlice.actions;
export default handsSlice.reducer;
