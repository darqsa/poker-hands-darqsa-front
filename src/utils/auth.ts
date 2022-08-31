import jwt from "jwt-decode";

export const fetchToken = (token: string) => {
  const payloadToken: {
    id: string;
    username: string;
    iat: number;
  } = jwt(token);

  return {
    token: token,
    id: payloadToken.id,
    username: payloadToken.username,
  };
};
