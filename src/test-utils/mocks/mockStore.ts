import { configureStore, createReducer } from "@reduxjs/toolkit";
import { HandData } from "../../features/hands/models/Hand";
import { fakeHand } from "./mockHand";

const initialState: HandData[] = [fakeHand];

const mockHandsReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state) => state);
});

const emptyMockHandsReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state) => []);
});

const mockStore = configureStore({
  reducer: {
    hands: mockHandsReducer,
  },
});

export const emptyMockStore = configureStore({
  reducer: {
    hands: emptyMockHandsReducer,
  },
});

export default mockStore;
