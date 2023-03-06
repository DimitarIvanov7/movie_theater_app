import { Booking } from 'src/bookings/booking.entity';
import { Comment } from 'src/comments/comment.entity';
import { Hall } from 'src/halls/hall.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  length_minutes: number;

  @Column()
  image: string;

  @ManyToMany(() => Genre, (genre) => genre.movie)
  @JoinTable()
  genre: Genre[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comment: Comment[];

  @OneToMany(() => Booking, (booking) => booking.movie)
  bookings: Booking[];
}
