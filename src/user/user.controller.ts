import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOneById(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
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

  @UseGuards(JwtAuthGuard)
  @Post('/ownership')
  @HttpCode(200)
  userCarOwnership(@Body() body): Promise<{ message: string }> {
    return this.userService.userCarOwnhership(body);
  }
}
