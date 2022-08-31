import { UserData, UserToken } from "../models/User";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../../../app/hooks";
import fetchToken from "../../../utils/auth";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../slices/userSlice";

export const apiURL = process.env.REACT_APP_USERS_API_URL;

const useUserApi = () => {
  const register = async (userData: UserData) => {
    await axios.post(`${apiURL}users/register`, userData);
  };

  const dispatch = useAppDispatch();

  const login = async (userData: UserData) => {
    const {
      data: {
        user: { token },
      },
    }: AxiosResponse<UserToken> = await axios.post(
      `${apiURL}users/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = fetchToken(token);

    localStorage.setItem("token", token);
    dispatch(loginUserActionCreator(user));
  };

  const logout = () => {
    dispatch(logoutUserActionCreator());
    localStorage.removeItem("token");
  };

  return { register, login, logout };
};
export default useUserApi;
