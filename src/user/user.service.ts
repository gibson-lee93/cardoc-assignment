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
import { CarsService } from '../cars/cars.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private carsService: CarsService,
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
    if (!user) {
      throw new BadRequestException(
        `해당 username:${username}의 자동차 정보가 존재하지 않습니다`,
      );
    }
    delete user.password;
    return user;
  }

  async userCarOwnhership(body): Promise<{ message: string }> {
    if (Object.keys(body).length > 5) {
      throw new BadRequestException(
        '최대 5명까지의 사용자에 대한 요청을 받을 수 있습니다.',
      );
    }

    for (const element of body) {
      await this.assignUserCar(element.username, element.trimId);
    }

    return { message: '성공적으로 저장하였습니다.' };
  }

  async assignUserCar(username: string, trimId: number): Promise<void> {
    const user = await this.findOneByUsername(username);
    const car = await this.carsService.getCarById(trimId);
    user.cars.push(car);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
