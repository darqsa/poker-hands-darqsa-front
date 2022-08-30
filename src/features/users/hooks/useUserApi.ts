import { RegisterUserData } from "../models/User";
import axios from "axios";

const apiURL = process.env.REACT_APP_USERS_API_URL;

const useUser = () => {
  const register = async (registerUserData: RegisterUserData) => {
    await axios.post(`${apiURL}users/register`, {
      username: registerUserData.username,
      password: registerUserData.password,
    });
  };

  return { register };
};
export default useUser;
