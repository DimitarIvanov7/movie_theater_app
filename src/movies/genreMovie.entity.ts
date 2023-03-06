import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Movie } from './movie.entity';

@Entity()
export class MovieGenre {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie' })
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'genre' })
  genre: Genre;
}
