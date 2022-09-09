import jwtDecode from "jwt-decode";

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

const getInitialUser = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      id: "",
      token: "",
      username: "",
    };
  }

  const payload = jwtDecode<TokenPayload>(token);

  return {
    ...payload,
    token,
  };
};

export default getInitialUser;
