import alertSlice, { toggleAlertActionCreator } from "./alertSlice";

describe("Given an alert slice", () => {
  describe("When invoked with an initial state as previous alert state fakeUser", () => {
    test("Then it should return the opposite state", () => {
      const initialState = false;

      const alert = alertSlice(initialState, toggleAlertActionCreator());
      const expectedNewState = true;

      expect(alert).toStrictEqual(expectedNewState);
    });
  });
});
