import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
