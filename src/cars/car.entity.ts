import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  trimId: number;

  @Column()
  brandName: string;

  @Column()
  modelName: string;

  @ManyToMany((type) => User, (users) => users.cars)
  users: User[];
}
