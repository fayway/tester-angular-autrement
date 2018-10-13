import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RentalModule } from './rental/rental.module';
import { DiscountModule } from './discount/discount.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [AuthModule, RentalModule, BookingModule, DiscountModule],
  providers: [],
})
export class AppModule {}
