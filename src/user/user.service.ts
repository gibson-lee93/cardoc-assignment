import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async createUser(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    try {
      const user = this.userRepository.create(userCredentialsDto);
      await this.userRepository.save(user);
      return { message: '회원가입에 성공하였습니다.' };
    } catch (error) {
      if (error.errno === 19) {
        throw new BadRequestException('이미 가입된 username입니다');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = userCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.authService.jwtSign(user);
    } else {
      throw new BadRequestException('회원 정보가 일치하지 않습니다');
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    delete user.password;
    return user;
  }
}
