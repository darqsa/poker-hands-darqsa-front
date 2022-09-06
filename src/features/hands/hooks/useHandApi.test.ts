import { renderHook } from "@testing-library/react";
import { fakeHand } from "../../../test-utils/mocks/mockHand";
import Wrapper from "../../../test-utils/Wrapper";
import { loadHandsActionCreator } from "../slices/handsSlice";
import useHandsApi from "./useHandsApi";

const mockUseDispatch = jest.fn();

jest.mock("../../../app/hooks", () => ({
  ...jest.requireActual("../../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a useHandApi hook", () => {
  describe("When loadHands function is called", () => {
    test("The it should call the mockUseDispatch with an array with fakeHand", async () => {
      const {
        result: {
          current: { loadHands },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      await loadHands();

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadHandsActionCreator([fakeHand])
      );
    });
  });
});
