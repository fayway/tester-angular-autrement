import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginFormComponent } from './login-form.component';
import { fireEvent } from 'ngx-testing-library';

describe('TestComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let nativeElement:Element;
  let username:HTMLInputElement;
  let password:HTMLInputElement;
  let submit:HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    username = nativeElement.querySelector('input[name=username]');
    password = nativeElement.querySelector('input[name=password]');
    submit = nativeElement.querySelector('button[type=submit]');
    jest.spyOn(component.submitted, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit when form is incomplete', () => {
    jest.spyOn(component.submitted, 'emit');

    username.value = 'user';
    username.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submit.click();
    expect(component.submitted.emit).not.toHaveBeenCalled();
  });

  it('should emit when form is complete', () => {
    jest.spyOn(component.submitted, 'emit');

    // username.value = 'user';
    // username.dispatchEvent(new Event('input'));
    // password.value = 'pass';
    // password.dispatchEvent(new Event('input'));

    fireEvent.input(username, { target: { value: 'user'}});
    fireEvent.input(password, { target: { value: 'pass'}});

    fixture.detectChanges();

    submit.click();
    expect(component.submitted.emit).toHaveBeenCalledWith({username: 'user', password: 'pass'});
  });
});
