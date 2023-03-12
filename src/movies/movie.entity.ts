import { Booking } from 'src/bookings/booking.entity';
import { Comment } from 'src/comments/comment.entity';
import { Hall } from 'src/halls/hall.entity';
import { Rating } from 'src/ratings/rating.entity';
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

  @OneToMany(() => Comment, (comment) => comment.movie)
  comment: Comment[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  rating: Rating[];

  @ManyToMany(() => Genre, (genre) => genre.movie)
  genre: Genre[];
}
