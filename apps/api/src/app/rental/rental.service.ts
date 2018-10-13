import { Injectable } from '@nestjs/common';
import { Rental, RentalsQuery } from './rental.models';
import { rentals } from './rental.db';

@Injectable()
export class RentalService {
  rentals: Rental[] = rentals;

  constructor() {}

  getAvailableRentals(query: RentalsQuery = {}) {
    if (query.city) {
      return [
        ...this.rentals.filter(rental => rental.city.toLowerCase().includes(query.city.toLowerCase())),
      ]
    }
    return this.rentals;
  }

  findRentalById(id: number): Rental {
    return this.rentals.find(rental => rental.id === id);
  }
}
