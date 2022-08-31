import jwt from "jwt-decode";
import fetchToken from "./auth";

jest.mock("jwt-decode");

describe("Given a getTokenData function", () => {
  describe("When called with a token (string) as an argument", () => {
    test("Then it should call a jwt decode function and return its value", () => {
      const token = "holas";

      fetchToken(token);

      expect(jwt).toHaveBeenCalledWith(token);
    });
  });
});
