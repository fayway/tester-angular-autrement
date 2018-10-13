import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { isAfter } from 'date-fns';
import { RentalService } from '../rental/rental.service';
import { DiscountService } from '../discount/discount.service';
import { User } from '../auth/auth.models';
import {
  Booking,
  BookingRequestDto,
  BookingResponseDto,
} from './booking.models';

@Injectable()
export class BookingService {
  constructor(
    @Inject(forwardRef(() => DiscountService))
    private discountService: DiscountService,
    private rentalService: RentalService,
  ) {}

  book(bookingRequestDto: BookingRequestDto, user: User): BookingResponseDto {
    const booking = this.from(bookingRequestDto, user);
    return {
      ...booking,
      duration: booking.getDuration(),
      totalPrice: booking.getTotalPrice(),
      discounts: this.discountService
        .getAllDiscounts(bookingRequestDto, user)
        .filter(discount => discount.isApplicable())
        .map(discount => ({
          type: discount.getType(),
          discount: discount.getDiscount(),
          isApplicable: true,
        })),
    };
  }

  from(bookingRequestDto: BookingRequestDto, user: User): Booking {
    if (isAfter(bookingRequestDto.startDate, bookingRequestDto.endDate)) {
      throw new BadRequestException('End Date must be after Start Date');
    }
    const rental = this.rentalService.findRentalById(
      bookingRequestDto.idRental,
    );
    const booking = new Booking();
    booking.rental = rental;
    booking.user = user;
    booking.startDate = bookingRequestDto.startDate;
    booking.endDate = bookingRequestDto.endDate;
    return booking;
  }
}
