import { Action } from '@ngrx/store';
import { Rental, RentalsQuery } from '../rentals.models';

export enum RentalsActionTypes {
  LoadRentals = '[Rentals] Load Rentals',
  LoadOneRental = '[Rentals] Load One Rental',
  RentalsLoaded = '[Rentals] Rentals Loaded',
  RentalsLoadError = '[Rentals] Rentals Load Error',
}

export class LoadRentals implements Action {
  readonly type = RentalsActionTypes.LoadRentals;
  constructor(public payload: RentalsQuery = {}) {}
}

export class LoadOneRental implements Action {
  readonly type = RentalsActionTypes.LoadOneRental;
  constructor(public payload: number) {}
}

export class RentalsLoaded implements Action {
  readonly type = RentalsActionTypes.RentalsLoaded;
  constructor(public payload: Rental[]) {}
}

export class RentalsLoadError implements Action {
  readonly type = RentalsActionTypes.RentalsLoadError;
  constructor(public payload: Error) {}
}

export type RentalsAction =
  | LoadRentals
  | LoadOneRental
  | RentalsLoaded
  | RentalsLoadError;

export const fromRentalsActions = {
  LoadRentals,
  LoadOneRental,
  RentalsLoaded,
  RentalsLoadError,
};
