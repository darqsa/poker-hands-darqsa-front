import { renderHook } from "@testing-library/react";
import Wrapper from "../../../test-utils/Wrapper";
import { UserData } from "../models/User";
import useUserApi from "./useUserApi";

const mockUseDispatch = jest.fn();

jest.mock("../../../app/hooks", () => ({
  ...jest.requireActual("../../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a useUserApi hook", () => {
  describe("When signUp function is called with a User data", () => {
    test("The it should return the response of the request", async () => {
      const mockUser: UserData = {
        username: "bobby",
        password: "thesponge",
      };
      const newUser = {
        username: "bobby",
        id: "6311947608ed28e35ccabbeb",
      };

      const {
        result: {
          current: { register },
        },
      } = renderHook(useUserApi, { wrapper: Wrapper });

      await register(mockUser);

      const result = await register(mockUser);

      expect(result).toStrictEqual(newUser);
    });
  });
});
