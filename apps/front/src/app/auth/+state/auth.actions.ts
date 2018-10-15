import { Action } from '@ngrx/store';
import { UserModel, AuthenticateBody } from '../user.models';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  LoginPageReset = '[Auth] Login Page Reset',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: AuthenticateBody) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: { user: UserModel; accessToken: string }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LoginPageReset implements Action {
  readonly type = AuthActionTypes.LoginPageReset;
}

export type AuthActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | LoginPageReset;
