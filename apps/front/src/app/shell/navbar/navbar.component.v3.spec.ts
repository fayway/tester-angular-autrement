import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthFacade } from '../../auth/+state/auth.facade';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../auth/user.models';

describe('NavbarComponent Snapshot testing way', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authFacade: AuthFacade;
  let nativeElement: Element;

  const loggedIn$ = new BehaviorSubject<boolean>(false);
  const user$= new BehaviorSubject<UserModel>(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthFacade, useValue: { loggedIn$, user$, logout: jest.fn() }},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    authFacade = TestBed.get(AuthFacade);
  }));

  it('should create match initail snapshot', () => {
    fixture.detectChanges();
    expect(nativeElement).toMatchSnapshot();
  });

  it('should match snapshot when logged in', () => {
    loggedIn$.next(true);
    user$.next({username: 'mbob', firstname: 'Bob', lastname: 'Marley', isPremium: false});
    fixture.detectChanges();
    expect(nativeElement).toMatchSnapshot();
  });

});
