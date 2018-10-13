import { Booking } from '../booking/booking.models';
import { ApiModelProperty } from '@nestjs/swagger';

export interface Discount {
  getType(): DiscountType;
  isApplicable(): boolean;
  getDiscount(): number;
}
export enum DiscountType {
  PREMIUM_USER = 'premium user',
  DURATION = 'duration',
  SLICE = 'slice',
}

export class PremiumUserDiscount implements Discount {
  constructor(private booking: Booking, private percentage: number) {}
  getType(): DiscountType {
    return DiscountType.PREMIUM_USER;
  }
  isApplicable() {
    return this.booking.user.isPremium;
  }
  getDiscount() {
    return this.booking.getTotalPrice() * this.percentage;
  }
}

export class DurationDiscount implements Discount {
  constructor(private booking: Booking, private days: number, private percentage: number) {}
  getType(): DiscountType {
    return DiscountType.DURATION;
  }
  isApplicable() {
    return this.booking.getDuration() >= this.days;
  }
  getDiscount() {
    return this.booking.getTotalPrice() * this.percentage;
  }
}

export class SliceDiscount implements Discount {
  constructor(
    private booking: Booking,
    private sliceValue: number,
    private sliceDiscount: number,
  ) {}
  getType(): DiscountType {
    return DiscountType.SLICE;
  }
  isApplicable() {
    return this.booking.getTotalPrice() > this.sliceValue;
  }
  getDiscount() {
    return (
      Math.floor(this.booking.getTotalPrice() / this.sliceValue) *
      this.sliceDiscount
    );
  }
}

export class DiscountDto {
  @ApiModelProperty()
  type: string;
  @ApiModelProperty()
  isApplicable: boolean;
  @ApiModelProperty()
  discount: number;
}
