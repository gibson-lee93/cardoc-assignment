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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userCredentialsDto: UserCredentialsDto) {
    try {
      const user = this.userRepository.create(userCredentialsDto);
      const result = await this.userRepository.save(user);
      delete result.password;
      return result;
    } catch (error) {
      if (error.errno === 19) {
        throw new BadRequestException('이미 가입된 username입니다');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(userCredentialsDto: UserCredentialsDto) {
    const { username, password } = userCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    } else {
      throw new BadRequestException('회원 정보가 일치하지 않습니다');
    }
  }
}
