import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { RentalsState } from './rentals.reducer';
import { rentalsQuery } from './rentals.selectors';
import { LoadOneRental, LoadRentals } from './rentals.actions';
import { RentalsQuery } from '../rentals.models';

@Injectable({
  providedIn: 'root',
})
export class RentalsFacade {
  loading$ = this.store.select(rentalsQuery.getLoading);
  allRentals$ = this.store.select(rentalsQuery.getAllRentals);
  error$ = this.store.select(rentalsQuery.getError);
  selectedRental$ = id => this.store.select(rentalsQuery.getSelectedRental(id));

  constructor(private store: Store<{ rentals: RentalsState }>) {}

  loadAll(query: RentalsQuery) {
    this.store.dispatch(new LoadRentals(query));
  }

  loadOne(id: number) {
    this.store.dispatch(new LoadOneRental(id));
  }
}
