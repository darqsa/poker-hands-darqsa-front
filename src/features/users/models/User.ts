export interface UserData {
  username: string;
  password: string;
}

export interface LoginUserData {
  username: string;
  token: string;
  id: string;
  isLogged: boolean;
}
