import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto, JwtPayload, User } from './auth.models';

@Injectable()
export class AuthService {
  userStore: User[] = [
    {
      username: 'user1',
      password: 'pass1',
      firstname: 'Saul',
      lastname: 'Goodman',
      isPremium: true,
    },
    {
      username: 'user2',
      password: 'pass2',
      firstname: 'John',
      lastname: 'Doe',
      isPremium: false,
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async findUser(authenticateDto: AuthenticateDto) {
    return this.userStore.find(user => {
      return (
        user.username === authenticateDto.username &&
        user.password === authenticateDto.password
      );
    });
  }

  createToken(user: User) {
    const userJwt: JwtPayload = {
      username: user.username,
    };
    const accessToken = this.jwtService.sign(userJwt);
    return {
      accessToken,
      user,
      expiresIn: 3600,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.userStore.find(user => {
      return user.username === payload.username;
    });
  }
}
