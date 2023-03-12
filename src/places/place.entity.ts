import { Hall } from 'src/halls/hall.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  picture: string;

  @OneToMany(() => Hall, (hall) => hall.place)
  bookings: Hall[];
}
