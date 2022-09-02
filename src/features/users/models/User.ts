export interface UserData {
  username: string;
  password: string;
}

export interface LoginUserData {
  username: string;
  token: string;
  id: string;
}
export interface RegisterUserData {
  username: string;
  id: string;
}
export interface UserToken {
  token: string;
}
