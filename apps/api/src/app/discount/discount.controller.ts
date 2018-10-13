import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { DiscountService } from './discount.service';
import { BookingRequestDto } from '../booking/booking.models';
import { DiscountDto } from './discount.models';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/discount')
@ApiUseTags('Discounts')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: DiscountDto, isArray: true })
  @UsePipes(new ValidationPipe())
  getAllDiscounts(
    @Body() bookingRequestDto: BookingRequestDto,
    @Req() req,
  ): DiscountDto[] {
    const discounts = this.discountService.getAllDiscounts(
      bookingRequestDto,
      req.user,
    );
    return discounts.map(discount => ({
      type: discount.getType(),
      isApplicable: discount.isApplicable(),
      discount: discount.getDiscount(),
    }));
  }
}
