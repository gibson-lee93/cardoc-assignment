import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const { brandName, modelName, tireSize } = createCarDto;
    const car = this.carsRepository.create({ brandName, modelName });

    const tireSizes = tireSize.match(/[-+]?[0-9]+/g);
    const tire = this.tireRepository.create({
      width: Number(tireSizes[0]),
      aspectRatio: Number(tireSizes[1]),
      wheelSize: Number(tireSizes[2]),
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
