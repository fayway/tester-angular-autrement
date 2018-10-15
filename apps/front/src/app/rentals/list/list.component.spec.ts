import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { SharedModule } from '../../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { combineReducers, StoreModule } from '@ngrx/store';
import { rentalsReducer } from '../+state/rentals.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RentalsEffects } from '../+state/rentals.effects';
import { RentalsFacade } from '../+state/rentals.facade';
import { AuthFacade } from '../../auth/+state/auth.facade';
import { authReducers } from '../../auth/+state/auth.selectors';
import { AuthEffects } from '../../auth/+state/auth.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('TestComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let nativeElement: Element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        StoreModule.forRoot({
          'auth': combineReducers(authReducers),
          'rentals': rentalsReducer,
        }),
        EffectsModule.forRoot([AuthEffects, RentalsEffects]),
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        RentalsFacade,
        AuthFacade,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(nativeElement).toMatchSnapshot();
  });
});
