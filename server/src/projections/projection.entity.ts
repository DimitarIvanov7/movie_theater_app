import { BookedSeat } from 'src/bookings/bookedSeat.entity';
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  ['3d']: boolean;

  @Column()
  hallId: string;

  @Column()
  movieId: string;

  @ManyToOne(() => Movie, (movie) => movie.id, { eager: true })
  movie: Movie;

  @ManyToOne(() => Hall, (hall) => hall.id)
  hall: Hall;

  @OneToMany(() => BookedSeat, (booking) => booking.projection)
  bookings: BookedSeat[];
}
