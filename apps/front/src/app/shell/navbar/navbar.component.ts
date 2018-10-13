import { Component } from '@angular/core';
import { AuthFacade } from '../../auth/+state/auth.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  loggedIn$ = this.authFacade.loggedIn$;
  user$ = this.authFacade.user$;

  constructor(private authFacade: AuthFacade) {}

  logoutUser() {
    this.authFacade.logout();
  }
}
