import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  jwtSign(user: User): { access_token: string } {
    const payload: JwtPayload = {
      username: user.username,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
