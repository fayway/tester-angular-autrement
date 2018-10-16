import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ListComponent } from './list.component';
import { SharedModule } from '../../shared/shared.module';
import { rentalsReducer } from '../+state/rentals.reducer';
import { RentalsEffects } from '../+state/rentals.effects';
import { authReducers } from '../../auth/+state/auth.selectors';
import { Rental, Type } from '../rentals.models';
import { LoginSuccess } from '../../auth/+state/auth.actions';


describe('TestComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let nativeElement: Element;

  let router: Router;
  let httpClient: HttpClient;
  let store: Store<any>;

  const rentals: Rental[] = [
    {
      id: 1, title: 'Title', price: 80, description: 'desc', city: 'Paris',
      image: 'image', type: Type.ENTIRE_HOME, roomsNbr: 2, guestsNbr: 4
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        StoreModule.forRoot({
          'auth': combineReducers(authReducers),
          'rentals': rentalsReducer,
        }),
        EffectsModule.forRoot([RentalsEffects]),
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    router = TestBed.get(Router);
    httpClient = TestBed.get(HttpClient);
    store = TestBed.get(Store);

    spyOn(router, 'navigate').and.stub();
    spyOn(httpClient, 'get').and.returnValue(of(rentals));
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot when not logged in', () => {
    expect(httpClient.get).toHaveBeenCalledWith('/api/rentals', undefined);
    expect(nativeElement).toMatchSnapshot();
  });

  it('should match snapshot when logged in', () => {
    store.dispatch(
      new LoginSuccess({user: {username: 'user', firstname: 'john', lastname: 'doe', isPremium: true}, accessToken: 'token'})
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(nativeElement).toMatchSnapshot();
    })
  });
});
