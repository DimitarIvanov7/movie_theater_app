import { Booking } from 'src/bookings/booking.entity';
import { Hall } from 'src/halls/hall.entity';
import { Movie } from 'src/movies/movie.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Projection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  seat: number;

  @Column()
  price: number;

  @Column()
  ['3d']: boolean;

  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;

  @ManyToOne(() => Hall, (hall) => hall.id)
  hall: Hall;

  @OneToMany(() => Booking, (booking) => booking.projection)
  bookings: Booking[];
}
