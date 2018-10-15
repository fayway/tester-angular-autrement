import { AuthActionsUnion, AuthActionTypes } from './auth.actions';
import { UserModel } from '../user.models';

export interface State {
  loggedIn: boolean;
  user: UserModel;
  accessToken: string;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  accessToken: null,
};

export function authReducer(
  state = initialState,
  action: AuthActionsUnion,
): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getAccessToken = (state: State) => state.accessToken;
