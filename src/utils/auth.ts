import jwt from "jwt-decode";

const fetchToken = (token: string) => {
  const payloadToken: {
    id: string;
    username: string;
    iat: number;
  } = jwt(token);

  return { token: token, id: payloadToken.id, username: payloadToken.username };
};
export default fetchToken;
