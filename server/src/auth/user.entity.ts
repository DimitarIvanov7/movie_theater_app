import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookedSeat } from 'src/bookings/bookedSeat.entity';
import { Comment } from 'src/comments/comment.entity';
import { Rating } from 'src/ratings/rating.entity';
import { Roles } from './interfaces/user-roles.type';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ default: `dimiturivanov92@gmail.com` })
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: Roles.user })
  role: string;

  @Column({ nullable: true })
  refreshToken: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @OneToMany(() => BookedSeat, (booking) => booking.user, {
    eager: true,
    cascade: true,
  })
  bookings: BookedSeat[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comment: Comment[];

  @OneToMany(() => Rating, (rating) => rating.user, { eager: true })
  rating: Rating[];
}
