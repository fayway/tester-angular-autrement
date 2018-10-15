import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AuthFacade } from '../../auth/+state/auth.facade';
import { UserModel } from '../../auth/user.models';

describe('NavbarComponent Angular way', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarElement: Element;
  let authFacade: AuthFacade;
  const loggedIn$ = new BehaviorSubject<boolean>(false);
  const user$ = new BehaviorSubject<UserModel>(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthFacade, useValue: { loggedIn$, user$, logout: jest.fn() }},
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    navbarElement = fixture.nativeElement;
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have company name', () => {
    const company: HTMLElement = navbarElement.querySelector(`.company`);
    expect(company.textContent).toContain('WaterBnb');
  });

  it('should have login button when not logged in and no logout button', () => {
    const loginButton: HTMLElement = navbarElement.querySelector(`[data-testid='login']`);
    expect(loginButton).toBeTruthy();
    const logoutButton: HTMLElement = navbarElement.querySelector(`[data-testid='logout']`);
    expect(logoutButton).toBeFalsy();
  });

  it('should have logout button when logged in and no login button', () => {
    loggedIn$.next(true);
    fixture.detectChanges();
    const loginButton: HTMLElement = navbarElement.querySelector(`[data-testid='login']`);
    expect(loginButton).toBeFalsy();
    const logoutButton: HTMLElement = navbarElement.querySelector(`[data-testid='logout']`);
    expect(logoutButton).toBeTruthy();
  });

  it('should have user full name', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: true});
    fixture.detectChanges();

    const user: HTMLElement = navbarElement.querySelector(`[data-testid='user']`);
    expect(user.textContent).toContain(`Bob Marley`);
  });

  it('should have a premium flag for premium users', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: true});
    fixture.detectChanges();

    const premiumIcon: HTMLElement = navbarElement.querySelector(`[data-testid='premium']`);
    expect(premiumIcon).toBeTruthy();
  });

  it('should not have premium flag for regular users', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: false});
    fixture.detectChanges();

    const premiumIcon: HTMLElement = navbarElement.querySelector(`[data-testid='premium']`);
    expect(premiumIcon).toBeFalsy();
  });

  it('should call authFacade.logout() when the logout button was clicked', () => {
    loggedIn$.next(true);
    fixture.detectChanges();

    const logoutButton: HTMLElement = navbarElement.querySelector(`[data-testid='logout']`);
    logoutButton.click();
    expect(authFacade.logout).toHaveBeenCalledTimes(1);
  });
});
