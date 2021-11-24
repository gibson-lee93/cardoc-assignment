import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.userService.createUser(userCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.userService.signIn(userCredentialsDto);
  }
}
