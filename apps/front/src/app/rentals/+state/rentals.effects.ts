import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import {
  LoadOneRental,
  LoadRentals,
  RentalsActionTypes,
  RentalsLoaded,
  RentalsLoadError,
} from './rentals.actions';
import { RentalsService } from '../rentals.service';

@Injectable()
export class RentalsEffects {
  @Effect()
  load$ = this.actions$.ofType(RentalsActionTypes.LoadRentals).pipe(
    map((action: LoadRentals) => action.payload),
    concatMap(query =>
      this.rentalsService.getRentals(query).pipe(
        map(rentals => new RentalsLoaded(rentals)),
        catchError((error: HttpErrorResponse) =>
          of(new RentalsLoadError(error)),
        ),
      ),
    ),
  );

  @Effect()
  loadOne$ = this.actions$.ofType(RentalsActionTypes.LoadOneRental).pipe(
    map((action: LoadOneRental) => action.payload),
    concatMap(id =>
      this.rentalsService.getRental(id).pipe(
        map(rental => new RentalsLoaded([rental])),
        catchError((error: HttpErrorResponse) =>
          of(new RentalsLoadError(error)),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private rentalsService: RentalsService,
  ) {}
}
