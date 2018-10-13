import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Discount, DurationDiscount, PremiumUserDiscount, SliceDiscount } from './discount.models';
import { BookingRequestDto } from '../booking/booking.models';
import { BookingService } from '../booking/booking.service';
import { User } from '../auth/auth.models';

@Injectable()
export class DiscountService {
  constructor(
    @Inject(forwardRef(() => BookingService))
    private bookingService: BookingService,
  ) {}

  getAllDiscounts(bookingDto: BookingRequestDto, user: User): Discount[] {
    const booking = this.bookingService.from(bookingDto, user);
    return [
      new PremiumUserDiscount(booking, 0.05),
      new DurationDiscount(booking, 7,0.1),
      new SliceDiscount(booking, 500, 50),
    ];
  }
}
