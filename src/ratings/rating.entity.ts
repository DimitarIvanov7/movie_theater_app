import { Movie } from 'src/movies/movie.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryColumn()
  movieId: string;

  @PrimaryColumn()
  userId: string;

  @Column()
  rating: number;

  @ManyToOne(() => Movie, (movie) => movie.id, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
