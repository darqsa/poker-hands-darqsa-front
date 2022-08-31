import axios from "axios";
import { UserData } from "../models/User";
import useUserApi, { apiURL } from "./useUserApi";

jest.mock("axios");

describe("Given a useUserApi hook", () => {
  describe("When invoke register function with a mockUser", () => {
    test("Then it should post a new user", async () => {
      const mockUser: UserData = {
        username: "bob",
        password: "thesponge",
      };

      const { register } = useUserApi();
      await register(mockUser);

      expect(axios.post).toHaveBeenCalledWith(
        `${apiURL}users/register`,
        mockUser
      );
    });
  });
});
