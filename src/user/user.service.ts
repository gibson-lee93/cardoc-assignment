import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const result = await this.userRepository.save(user);
      delete result.password;
      return result;
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('이미 가입된 username입니다');
      }
      throw new InternalServerErrorException();
    }
  }
}
