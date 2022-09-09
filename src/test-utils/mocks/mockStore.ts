import { configureStore, createReducer } from "@reduxjs/toolkit";
import { HandData } from "../../features/hands/models/Hand";
import { LoginUserData } from "../../features/users/models/User";
import { completeFakeHand, fakeHand } from "./mockHand";

const initialState: HandData[] = [fakeHand];
const userInitialState: LoginUserData = { id: "", token: "", username: "" };

const mockHandsReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state) => [completeFakeHand]);
});

const emptyMockHandsReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state) => []);
});

const mockUserReducer = createReducer(userInitialState, (builder) => {
  builder.addDefaultCase((state) => state);
});

const mockStore = configureStore({
  reducer: {
    hands: mockHandsReducer,
    user: mockUserReducer,
  },
});

export const emptyMockStore = configureStore({
  reducer: {
    hands: emptyMockHandsReducer,
    user: mockUserReducer,
  },
});

export default mockStore;
