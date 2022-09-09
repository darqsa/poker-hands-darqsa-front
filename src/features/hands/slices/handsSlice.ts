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
    deleteHand: (previousState, action: PayloadAction<string>) =>
      previousState.filter((hand) => hand.id !== action.payload),
  },
});

export const {
  loadHands: loadHandsActionCreator,
  deleteHand: deleteHandActionCreator,
} = handsSlice.actions;
export default handsSlice.reducer;
