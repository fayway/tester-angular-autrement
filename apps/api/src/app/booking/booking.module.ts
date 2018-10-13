import { Module } from '@nestjs/common';

import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { RentalService } from '../rental/rental.service';
import { DiscountService } from '../discount/discount.service';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, RentalService, DiscountService],
})
export class BookingModule {}
