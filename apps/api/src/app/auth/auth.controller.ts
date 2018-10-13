import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './auth.models';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@Controller('api')
@ApiUseTags('Security')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.FORBIDDEN })
  @UsePipes(new ValidationPipe())
  async authenticate(@Body() authenticateDto: AuthenticateDto): Promise<any> {
    const user = await this.authService.findUser(authenticateDto);
    if (!user) {
      throw new ForbiddenException();
    }
    return this.authService.createToken(user);
  }
}
