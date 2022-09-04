import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HandData } from "../models/Hand";

const initialState: HandData[] = [];

const handsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const { loadHands: loadHandsActionCreator } = handsSlice.actions;
export default handsSlice.reducer;
