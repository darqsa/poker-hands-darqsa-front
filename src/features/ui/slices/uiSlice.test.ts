import uiSlice, {
  closeAlertActionCreator,
  closeLoadingActionCreator,
  openAlertActionCreator,
  openLoadingActionCreator,
} from "./uiSlice";

describe("Given an openAlert slice", () => {
  describe("When invoked with an initial state as previous alert state and a message", () => {
    test("Then it should return the opposite state and the new message", () => {
      const initialState = {
        isAlertShown: false,
        alertMessage: "",
        isLoadingShown: false,
      };
      const newMessage = "hibob";

      const alert = uiSlice(initialState, openAlertActionCreator(newMessage));
      const expectedNewState = true;

      expect(alert.isAlertShown).toStrictEqual(expectedNewState);
    });
  });
});

describe("Given an closeAlert slice", () => {
  describe("When invoked", () => {
    test("Then it should close the Alert", () => {
      const initialState = {
        isAlertShown: true,
        alertMessage: "",
        isLoadingShown: false,
      };

      const alert = uiSlice(initialState, closeAlertActionCreator());
      const expectedNewState = false;

      expect(alert.isAlertShown).toStrictEqual(expectedNewState);
    });
  });
});

describe("Given an openLoading slice", () => {
  describe("When invoked", () => {
    test("Then it should open the loading", () => {
      const initialState = {
        isAlertShown: false,
        alertMessage: "",
        isLoadingShown: false,
      };

      const alert = uiSlice(initialState, openLoadingActionCreator());
      const expectedNewState = true;

      expect(alert.isLoadingShown).toStrictEqual(expectedNewState);
    });
  });
});

describe("Given an closeLoading slice", () => {
  describe("When invoked", () => {
    test("Then it should close the loading", () => {
      const initialState = {
        isAlertShown: false,
        alertMessage: "",
        isLoadingShown: false,
      };

      const alert = uiSlice(initialState, closeLoadingActionCreator());
      const expectedNewState = false;

      expect(alert.isLoadingShown).toStrictEqual(expectedNewState);
    });
  });
});
