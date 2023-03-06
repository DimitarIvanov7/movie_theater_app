import { Movie } from 'src/movies/movie.entity';
import { Projection } from 'src/projections/projection.entity';
import { Row } from 'src/rows/row.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BookingStatus } from './booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  seat: number;
  @Column()
  status: BookingStatus;
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @ManyToOne(() => Row, (row) => row.id)
  row: Row;
  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;
  @ManyToOne(() => Projection, (projection) => projection.id)
  projection: Projection;
}
