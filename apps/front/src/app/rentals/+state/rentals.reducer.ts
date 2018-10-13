import { RentalsAction, RentalsActionTypes } from './rentals.actions';
import { Rental } from '../rentals.models';

export interface RentalsState {
  list: Rental[];
  loading: boolean;
  error?: any;
}

export const initialState: RentalsState = {
  list: null,
  loading: false,
};

export function rentalsReducer(
  state: RentalsState = initialState,
  action: RentalsAction,
): RentalsState {
  switch (action.type) {
    case RentalsActionTypes.LoadRentals: {
      state = {
        ...state,
        list: [],
        loading: true,
      };
      break;
    }
    case RentalsActionTypes.RentalsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loading: false,
      };
      break;
    }
    case RentalsActionTypes.RentalsLoadError: {
      state = {
        ...state,
        list: [],
        loading: false,
        error: action.payload,
      };
      break;
    }
  }
  return state;
}
