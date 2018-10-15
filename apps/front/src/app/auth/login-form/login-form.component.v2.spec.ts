import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentTester } from 'ngx-speculoos';

import { LoginFormComponent } from './login-form.component';

class LoginFormComponentTester extends ComponentTester<LoginFormComponent> {
  constructor() {
    super(LoginFormComponent);
  }
  get username() {
    return this.input('input[name=username]');
  }
  get password() {
    return this.input('input[name=password]');
  }
  get submit() {
    return this.button('button[type=submit]');
  }
  get submitted() {
    return this.componentInstance.submitted;
  }
}

describe('TestComponent ngx-speculoos way', () => {
  let tester: LoginFormComponentTester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    tester = new LoginFormComponentTester();
    tester.detectChanges();
  });

  it('should not emit when form is incomplete', () => {
    jest.spyOn(tester.submitted, 'emit');

    tester.username.fillWith('user');
    tester.submit.click();

    expect(tester.submitted.emit).not.toHaveBeenCalled();
  });

  it('should emit when form is complete', () => {
    jest.spyOn(tester.submitted, 'emit');

    tester.username.fillWith('user');
    tester.password.fillWith('pass');
    tester.submit.click();

    expect(tester.submitted.emit).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
  });
});
