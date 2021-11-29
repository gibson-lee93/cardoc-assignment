import { CarsService } from '../cars/cars.service';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

jest.mock('../auth/auth.service');
jest.mock('../cars/cars.service');

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;
  let carsService: CarsService;
  let userRepository: MockRepository<User>;

  const mockUser = new User();
  mockUser.id = 'test';
  mockUser.password = 'password';

  const userCredentialsDto = {
    id: mockUser.id,
    password: mockUser.password,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        CarsService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository() },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    carsService = module.get<CarsService>(CarsService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect.assertions(4);
    expect(userService).toBeDefined();
    expect(authService).toBeDefined();
    expect(carsService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('회원 가입에 성공한다', async () => {
      userRepository.create.mockResolvedValue(undefined);
      userRepository.save.mockResolvedValue(mockUser);

      const result = await userService.createUser(userCredentialsDto);
      expect(result).toEqual({ message: '회원가입에 성공하였습니다.' });
    });

    it('ID가 중복되어 가입에 실패한다', async () => {
      try {
        await userService.createUser(userCredentialsDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('이미 가입된 username입니다');
      }
    });
  });

  describe('signIn', () => {
    it('로그인에 성공한다', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const mockToken = { access_token: 'TOKEN' };
      jest.spyOn(authService, 'jwtSign').mockReturnValue(mockToken);

      const result = await userService.signIn(userCredentialsDto);
      expect(result).toEqual(mockToken);
    });

    it('비밀번호가 일치하지 않아 로그인에 실패한다', async () => {
      expect.assertions(2);

      userRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      try {
        await userService.signIn(userCredentialsDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('회원 정보가 일치하지 않습니다');
      }
    });
  });

  describe('findOneById', () => {
    it('유저 조회에 성공한다', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await userService.findOneById(mockUser.id);
      expect(result).toEqual(mockUser);
    });

    it('유저가 존재하지 않아 조회에 실패한다', async () => {
      userRepository.findOne.mockResolvedValue(undefined);

      try {
        await userService.findOneById(mockUser.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual(
          `해당 id:${mockUser.id}의 자동차 정보가 존재하지 않습니다`,
        );
      }
    });
  });
});
