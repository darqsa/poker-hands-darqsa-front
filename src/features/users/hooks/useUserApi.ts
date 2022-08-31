import { UserData } from "../models/User";
import axios from "axios";

export const apiURL = process.env.REACT_APP_USERS_API_URL;

const useUserApi = () => {
  const register = async (UserData: UserData) => {
    await axios.post(`${apiURL}users/register`, {
      username: UserData.username,
      password: UserData.password,
    });
  };

  return { register };
};
export default useUserApi;
