import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  isPremium: boolean;
}

export interface JwtPayload {
  username: string;
}

export class AuthenticateDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
