import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  static readonly tokenHeaderName = 'x-auth-token';

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(JwtStrategy.tokenHeaderName),
      secretOrKey: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
