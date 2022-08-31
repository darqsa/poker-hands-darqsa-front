import jwt from "jwt-decode";

const fetchToken = (
  token: string
): {
  id: string;
  username: string;
  iat: number;
} => jwt(token);

export default fetchToken;
