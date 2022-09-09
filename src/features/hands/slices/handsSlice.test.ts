import { fakeHand } from "../../../test-utils/mocks/mockHand";
import { HandData } from "../models/Hand";
import handsSlice, {
  deleteHandActionCreator,
  loadHandsActionCreator,
} from "./handsSlice";

describe("Given a handsSlice function", () => {
  describe("When invoked with an initial state as previous hands and a loadHands with a fakeUser inside", () => {
    test("Then it should return an array with the fakeHand", () => {
      const initialState: HandData[] = [];

      const hands = handsSlice(
        initialState,
        loadHandsActionCreator([fakeHand])
      );

      expect(hands).toStrictEqual([fakeHand]);
    });
  });

  describe("When deleteHand reducer is called with a fake id as payload", () => {
    test("Then it should return the previous state without the hand that has the fakeId", () => {
      const hands = handsSlice(
        [fakeHand],
        deleteHandActionCreator(fakeHand.id as string)
      );

      expect(hands).not.toContain(fakeHand);
    });
  });
});
