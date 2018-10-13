import { Module } from '@nestjs/common';

import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { BookingService } from '../booking/booking.service';
import { RentalService } from '../rental/rental.service';

@Module({
  imports: [],
  controllers: [DiscountController],
  providers: [DiscountService, BookingService, RentalService],
})
export class DiscountModule {}
