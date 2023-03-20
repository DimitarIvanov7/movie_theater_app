import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/booking.entity';
import { Comment } from 'src/comments/comment.entity';
import { Rating } from 'src/ratings/rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @OneToMany(() => Booking, (booking) => booking.user, { eager: true })
  bookings: Booking[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comment: Comment[];

  @OneToMany(() => Rating, (rating) => rating.user, { eager: true })
  rating: Rating[];
}
