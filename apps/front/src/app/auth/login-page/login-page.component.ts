import { Component, OnInit } from '@angular/core';

import { AuthenticateBody } from '../user.models';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </app-login-form>
  `,
})
export class LoginPageComponent implements OnInit {
  pending$ = this.authFacade.loginPagePending$;
  error$ = this.authFacade.loginPageError$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.authFacade.resetLoginPageState();
  }

  onSubmit(body: AuthenticateBody) {
    this.authFacade.login(body);
  }
}
