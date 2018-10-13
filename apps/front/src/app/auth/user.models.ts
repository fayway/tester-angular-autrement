export interface AuthenticateBody {
  username: string;
  password: string;
}

export interface AuthenticateResponse {
  accessToken: string;
  user: UserModels;
}

export interface UserModels {
  username: string;
  firstname: string;
  lastname: string;
  isPremium: boolean;
}
