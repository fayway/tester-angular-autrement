import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RentalsState } from './rentals.reducer';

const getRentalsState = createFeatureSelector<RentalsState>('rentals');

const getLoading = createSelector(
  getRentalsState,
  (state: RentalsState) => state.loading,
);
const getError = createSelector(
  getRentalsState,
  (state: RentalsState) => state.error,
);

const getAllRentals = createSelector(
  getRentalsState,
  getLoading,
  (state: RentalsState, isLoading) => {
    return isLoading ? [] : state.list;
  },
);
const getSelectedRental = id => {
  return createSelector(getAllRentals, rentals => {
    const result = rentals.find(rental => rental.id === id);
    return result ? { ...result } : undefined;
  });
};

export const rentalsQuery = {
  getLoading,
  getError,
  getAllRentals,
  getSelectedRental,
};
