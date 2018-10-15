import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

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
import { RentalsService } from '../rentals.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Rental, Type } from '../rentals.models';

describe('TestComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let nativeElement: Element;
  let router: Router;
  let httpClient: HttpClient;
  const rentals: Rental[] = [
    {id: 1, title: 'Title', price: 80, description: 'desc', city: 'Paris', image: 'image', type: Type.ENTIRE_HOME, roomsNbr: 2, guestsNbr: 4}
  ];

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
        RentalsService,
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

    spyOn(httpClient, 'get').and.returnValue(of(rentals));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', async(() => {
    // https://github.com/angular/angular/issues/10127
    fixture.whenStable().then(() => {
      expect(httpClient.get).toHaveBeenCalledWith('/api/rentals', undefined);
      expect(nativeElement).toMatchSnapshot();
    });
  }));
});
