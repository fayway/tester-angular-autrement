import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { LoginPageComponent } from './login-page.component';
import { AuthFacade } from '../+state/auth.facade';
import { authReducers } from '../+state/auth.selectors';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SharedModule } from '../../shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../+state/auth.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('TestComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let nativeElement: Element;

  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent, LoginFormComponent ],
      imports: [
        StoreModule.forRoot({
          'auth': combineReducers(authReducers)
        }),
        EffectsModule.forRoot([AuthEffects]),
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthFacade,
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.debugElement.componentInstance;
    nativeElement = fixture.nativeElement;

    router = TestBed.get(Router);
    httpClient = TestBed.get(HttpClient);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match initial snapshot', () => {
    expect(nativeElement).toMatchSnapshot();
  });

  it('should log in and redirect to home page', () => {
    const userResponose = {
      accessToken: 'token',
      user: {
        username: 'user',
        firstname: 'john',
        lastname: 'doe',
        isPremium: true,
      }
    };
    spyOn(httpClient, 'post').and.returnValue(of(userResponose));
    spyOn(router, 'navigate').and.stub();

    const body = {username: 'user', password: 'pass'};
    component.onSubmit(body);

    expect(httpClient.post).toHaveBeenCalledWith('/api/authenticate', body);
    expect(router.navigate).toHaveBeenCalledWith(['/']);

  })

  it('should not log in and display an error for bad credentials', () => {
    spyOn(httpClient, 'post').and.returnValue(throwError(new Error()));
    spyOn(router, 'navigate').and.stub();

    const body = {username: 'user', password: 'wrong'};
    component.onSubmit(body);

    expect(httpClient.post).toHaveBeenCalledWith('/api/authenticate', body);
    expect(router.navigate).not.toHaveBeenCalledWith(['/']);

    fixture.detectChanges();
    expect(nativeElement).toMatchSnapshot(); // Assert Error Message

  })
});
