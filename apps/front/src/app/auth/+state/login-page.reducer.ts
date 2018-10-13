import { AuthActionsUnion, AuthActionTypes } from './auth.actions';

export interface LoginPageState {
  error: string | null;
  pending: boolean;
}

export const initialState: LoginPageState = {
  error: null,
  pending: false,
};

export function loginPageReducer(
  state = initialState,
  action: AuthActionsUnion,
): LoginPageState {
  switch (action.type) {
    case AuthActionTypes.LoginPageReset: {
      return initialState;
    }

    case AuthActionTypes.Login: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: LoginPageState) => state.error;
export const getPending = (state: LoginPageState) => state.pending;
