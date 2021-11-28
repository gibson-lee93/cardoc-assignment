import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Tire } from '../entities/tire.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  trimId: number;

  @Column()
  brandName: string;

  @Column()
  modelName: string;

  @OneToOne(() => Tire, { eager: true })
  @JoinColumn()
  tire: Tire;

  @ManyToMany((type) => User, (users) => users.cars)
  users: User[];
}
