import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  width: number;

  @Column()
  aspectRatio: number;

  @Column()
  wheelSize: number;
}
