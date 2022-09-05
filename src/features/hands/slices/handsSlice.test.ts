import { HandData } from "../models/Hand";
import handsSlice, { loadHandsActionCreator } from "./handsSlice";

describe("Given a usersSlice function", () => {
  describe("When invoked with an initial state as previous users and a loadUsers with a fakeUser inside", () => {
    test("Then it should return an array with the fakeUser", () => {
      const initialState: HandData[] = [];
      const fakeUser: HandData = {
        handName: "Best hand name ever",
        preGame: {
          hero: { hand: ["Ac", "Ad"], initialStack: 100, position: 0 },
          villains: [{ hand: ["Ah", "As"], initialStack: 100, position: 1 }],
        },
        game: { preFlop: { actions: ["Everyone is allin"], pot: 200 } },
        postGame: { finalPot: 200, gameWinner: "Hero" },
        id: "1234",
      };

      const users = handsSlice(
        initialState,
        loadHandsActionCreator([fakeUser])
      );

      expect(users).toStrictEqual([fakeUser]);
    });
  });
});
