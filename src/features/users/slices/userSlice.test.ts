import { LoginUserData } from "../models/User";
import userSlice, {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "./userSlice";

describe("Given a user slice", () => {
  describe("When invoked with an initial state as previous user and a login user action creator with a fakeUser", () => {
    test("Then it should return the fakeUser", () => {
      const initialState: LoginUserData = {
        id: "",
        token: "",
        username: "",
      };
      const fakeUser: LoginUserData = {
        id: "123456789",
        token: "1a2b3c",
        username: "bobthesponge",
      };

      const user = userSlice(initialState, loginUserActionCreator(fakeUser));

      expect(user).toStrictEqual(fakeUser);
    });
  });
  describe("When invoked with an initial state", () => {
    test("Then it should return the initialState", () => {
      const initialState: LoginUserData = {
        id: "",
        token: "",
        username: "",
      };

      const user = userSlice(initialState, logoutUserActionCreator());

      expect(user).toStrictEqual(initialState);
    });
  });
});
