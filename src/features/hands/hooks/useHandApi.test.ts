import { renderHook } from "@testing-library/react";
import {
  fakeHand,
  fakeHandWithoutId,
} from "../../../test-utils/mocks/mockHand";
import Wrapper from "../../../test-utils/Wrapper";
import {
  deleteHandActionCreator,
  loadHandsActionCreator,
} from "../slices/handsSlice";
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

  describe("When createHand function is called", () => {
    test("Then it should return a response message", async () => {
      const expectedMessage = "Hand created successfully";
      const {
        result: {
          current: { createHand },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      const createdHand = await createHand(fakeHandWithoutId);

      expect(createdHand.data).toBe(expectedMessage);
    });
  });

  describe("When deleteHand function is called with an fakeId", () => {
    test("Then it should call the mockDispatch with an action creator and the fakeId", async () => {
      const fakeId = "1234";

      const {
        result: {
          current: { deleteHand },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      await deleteHand(fakeId);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        deleteHandActionCreator(fakeId)
      );
    });
  });
});
