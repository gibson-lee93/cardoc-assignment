import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findOneByUsername(@GetUser() user: User) {
    return this.userService.findOneByUsername(user.username);
  }

  @Post('/signup')
  createUser(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.userService.createUser(userCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ access_token: string }> {
    return this.userService.signIn(userCredentialsDto);
  }
}
