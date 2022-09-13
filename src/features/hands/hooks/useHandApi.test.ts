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

      const formData = new FormData();
      formData.append("hand", JSON.stringify(fakeHandWithoutId));
      const createdHand = await createHand(formData);

      expect(createdHand.data).toBe(expectedMessage);
    });
  });
  describe("When editHand function is called", () => {
    test("Then it should return a response message", async () => {
      const expectedMessage = "Hand edited successfully";
      const {
        result: {
          current: { editHand },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      const formData = new FormData();
      formData.append("hand", JSON.stringify(fakeHandWithoutId));
      const response = await editHand(formData, "1234");

      expect(response.data).toBe(expectedMessage);
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

  describe("When loadHandById function is called with an fakeId", () => {
    test("Then it should return a fake hand with the fakeId", async () => {
      const fakeId = "1234";

      const {
        result: {
          current: { loadHandById },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      const expectedHand = await loadHandById(fakeId);

      expect(expectedHand).toStrictEqual({ fakeHand });
    });
  });

  describe("When searchHandByHandName function is called with an fakeName", () => {
    test("Then it should call the mockDispatch a fake hand array with the fakehand", async () => {
      const fakeName = "bobsponge";

      const {
        result: {
          current: { searchHandByHandName },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      await searchHandByHandName(fakeName);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadHandsActionCreator([fakeHand])
      );
    });

    test("Then if hands is empty it should return false", async () => {
      const fakeName = "bobspongebutempty";

      const {
        result: {
          current: { searchHandByHandName },
        },
      } = renderHook(useHandsApi, { wrapper: Wrapper });

      const result = await searchHandByHandName(fakeName);

      expect(result).toBe(false);
    });
  });
});
