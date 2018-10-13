import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AuthFacade } from '../../auth/+state/auth.facade';
import { BehaviorSubject } from 'rxjs';
import { UserModels } from '../../auth/user.models';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarElement: Element;
  let authFacade: AuthFacade;
  const loggedIn$ = new BehaviorSubject<boolean>(false);
  const user$ = new BehaviorSubject<UserModels>(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            loggedIn$,
            user$,
            logout: jest.fn()
          },
        },
      ],
    });

    fixture = TestBed.createComponent(NavbarComponent);
    navbarElement = fixture.nativeElement;
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthFacade);
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have company name', () => {
    fixture.detectChanges();
    const company: HTMLElement = navbarElement.querySelector(`.company`);
    expect(company.textContent).toContain('WaterBnb');
  });

  it('should have login button when not logged in and no logout button', () => {
    fixture.detectChanges();
    const loginButton: HTMLElement = navbarElement.querySelector(`[test-id='login']`);
    expect(loginButton).toBeTruthy();
    const logoutButton: HTMLElement = navbarElement.querySelector(`[test-id='logout']`);
    expect(logoutButton).toBeFalsy();
  });

  it('should have logout button when logged in and no login button', () => {
    loggedIn$.next(true);
    fixture.detectChanges();
    const loginButton: HTMLElement = navbarElement.querySelector(`[test-id='login']`);
    expect(loginButton).toBeFalsy();
    const logoutButton: HTMLElement = navbarElement.querySelector(`[test-id='logout']`);
    expect(logoutButton).toBeTruthy();
  });

  it('should have user full name', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: true});
    fixture.detectChanges();

    const user: HTMLElement = navbarElement.querySelector(`[test-id='user']`);
    expect(user.textContent).toContain(`Bob Marley`);
  });

  it('should have a premium flag for premium users', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: true});
    fixture.detectChanges();

    const premiumIcon: HTMLElement = navbarElement.querySelector(`[test-id='premium']`);
    expect(premiumIcon).toBeTruthy();
  });

  it('should not have premium flag for regular users', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: false});
    fixture.detectChanges();

    const premiumIcon: HTMLElement = navbarElement.querySelector(`[test-id='premium']`);
    expect(premiumIcon).toBeFalsy();
  });

  it('should call authFacade.logout() when the logout button was clicked', async (() => {
    loggedIn$.next(true);
    fixture.detectChanges();

    const logoutButton: HTMLElement = navbarElement.querySelector(`[test-id='logout']`);
    logoutButton.click();
    expect(authFacade.logout).toHaveBeenCalledTimes(1);
  }));
});
