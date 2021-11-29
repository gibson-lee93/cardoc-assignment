import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Car } from '../cars/car.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @ManyToMany((type) => Car, (car) => car.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'users_cars' })
  cars: Car[];
}
