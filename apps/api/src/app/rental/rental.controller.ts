import { Controller, Get, HttpStatus, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { shuffle, slice } from 'lodash';

import { RentalService } from './rental.service';
import { Rental, RentalsQuery } from './rental.models';

@Controller('api/rentals')
@ApiUseTags('Rentals')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Rental, isArray: true })
  get(@Query() query: RentalsQuery): Rental[] {
    const rentals = this.rentalService.getAvailableRentals(query);
    return shuffle(rentals);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Rental})
  getOne(@Param('id') id: string): Rental {
    const rental = this.rentalService.findRentalById(+id);
    if (!rental) {
      throw new NotFoundException(`Rental id ${id} not found`);
    }
    return rental;
  }
}
