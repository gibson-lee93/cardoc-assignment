import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tire } from '../entities/tire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Tire])],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
