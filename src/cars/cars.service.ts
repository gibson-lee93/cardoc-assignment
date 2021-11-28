import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tire } from '../entities/tire.entity';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    @InjectRepository(Tire)
    private tireRepository: Repository<Tire>,
  ) {}

  async getCarById(trimId: number): Promise<Car> {
    const car = await this.carsRepository.findOne({ trimId });
    if (!car) {
      throw new BadRequestException(
        '해당 trimId의 자동차 정보가 존재하지 않습니다',
      );
    }
    return car;
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const { brandName, modelName, tireSize } = createCarDto;
    const car = this.carsRepository.create({ brandName, modelName });

    const tireSizes = tireSize.match(/[-+]?[0-9]+/g).map(Number);
    const tire = this.tireRepository.create({
      width: tireSizes[0],
      aspectRatio: tireSizes[1],
      wheelSize: tireSizes[2],
    });

    try {
      await this.tireRepository.save(tire);
      car.tire = tire;
      await this.carsRepository.save(car);
      return car;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
