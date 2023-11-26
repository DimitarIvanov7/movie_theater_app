import { BookedSeat } from 'src/bookings/bookedSeat.entity';
import { Hall } from 'src/halls/hall.entity';
import { Movie } from 'src/movies/movie.entity';
import { Place } from 'src/places/place.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Projection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  date: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  ['3d']: boolean;

  @Column()
  hallId: string;

  @Column({ nullable: true })
  placeId: string;

  @Column()
  movieId: string;

  @ManyToOne(() => Movie, (movie) => movie.id, { eager: true })
  movie: Movie;

  @ManyToOne(() => Hall, (hall) => hall.id, { eager: true })
  hall: Hall;

  @ManyToOne(() => Place, (place) => place.id, { eager: true, nullable: true })
  place: Place;

  @OneToMany(() => BookedSeat, (booking) => booking.projection, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bookings: BookedSeat[];
}
