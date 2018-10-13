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

import { BookingService } from './booking.service';
import {
  Booking,
  BookingRequestDto,
  BookingResponseDto,
} from './booking.models';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/booking')
@ApiUseTags('Booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: BookingResponseDto })
  @UsePipes(new ValidationPipe())
  book(
    @Body() bookingRequestDto: BookingRequestDto,
    @Req() req,
  ): BookingResponseDto {
    return this.bookingService.book(bookingRequestDto, req.user);
  }
}
