import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { authQuery, AuthState } from './auth.selectors';
import * as AuthActions from './auth.actions';
import { Logout } from './auth.actions';
import { AuthenticateBody } from '../user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  loggedIn$ = this.store.pipe(select(authQuery.getLoggedIn));
  user$ = this.store.pipe(select(authQuery.getUser));
  accessToken = this.store.pipe(select(authQuery.getAccessToken));
  loginPagePending$ = this.store.pipe(select(authQuery.getLoginPagePending));
  loginPageError$ = this.store.pipe(select(authQuery.getLoginPageError));

  constructor(private store: Store<{ auth: AuthState }>) {}

  login(body: AuthenticateBody) {
    this.store.dispatch(new AuthActions.Login(body));
  }

  resetLoginPageState() {
    this.store.dispatch(new AuthActions.LoginPageReset());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
