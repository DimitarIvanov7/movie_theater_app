import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookedSeat } from 'src/bookings/bookedSeat.entity';
import { Comment } from 'src/comments/comment.entity';
import { Rating } from 'src/ratings/rating.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ default: () => `'${uuid()}'` })
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @OneToMany(() => BookedSeat, (booking) => booking.user, { eager: true })
  bookings: BookedSeat[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comment: Comment[];

  @OneToMany(() => Rating, (rating) => rating.user, { eager: true })
  rating: Rating[];
}
