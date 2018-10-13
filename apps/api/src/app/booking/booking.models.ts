import { Rental } from '../rental/rental.models';
import { User } from '../auth/auth.models';
import { differenceInCalendarDays } from 'date-fns';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { DiscountDto } from '../discount/discount.models';

export class Booking {
  user: User;
  rental: Rental;
  startDate: Date;
  endDate: Date;
  getDuration() {
    return differenceInCalendarDays(this.endDate, this.startDate) + 1;
  }
  getTotalPrice() {
    return this.rental.price * this.getDuration();
  }
}

export class BookingRequestDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly idRental: number;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly endDate: Date;
}

export class BookingResponseDto {
  @ApiModelProperty()
  user: User;
  @ApiModelProperty()
  rental: Rental;
  @ApiModelProperty()
  startDate: Date;
  @ApiModelProperty()
  endDate: Date;
  @ApiModelProperty()
  duration: number;
  @ApiModelProperty()
  totalPrice: number;
  @ApiModelProperty()
  discounts: DiscountDto[];
}
