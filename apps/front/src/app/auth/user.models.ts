export interface AuthenticateBody {
  username: string;
  password: string;
}

export interface AuthenticateResponse {
  accessToken: string;
  user: UserModel;
}

export interface UserModel {
  username: string;
  firstname: string;
  lastname: string;
  isPremium: boolean;
}
