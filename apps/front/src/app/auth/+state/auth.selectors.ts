import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/store/reducers/index';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';

export interface AuthState {
  status: fromAuth.State;
  loginPage?: fromLoginPage.LoginPageState;
}

export const authInitialState: AuthState = {
  status: fromAuth.initialState,
  loginPage: fromLoginPage.initialState,
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const authReducers: ActionReducerMap<AuthState> = {
  status: fromAuth.authReducer,
  loginPage: fromLoginPage.loginPageReducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status,
);
export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn,
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getAccessToken = createSelector(
  selectAuthStatusState,
  fromAuth.getAccessToken,
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage,
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError,
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending,
);

export const authQuery = {
  getLoggedIn,
  getUser,
  getAccessToken,
  getLoginPageError,
  getLoginPagePending,
};
