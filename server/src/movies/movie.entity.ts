import { Comment } from 'src/comments/comment.entity';
import { Rating } from 'src/ratings/rating.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ nullable: true })
  premieredate?: string;

  @Column({ default: 'Няма информация за този филм' })
  info: string;

  @Column({ nullable: true })
  genres: string;

  @Column({ nullable: true })
  actors: string;

  @Column({ nullable: true })
  director: string;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comment: Comment[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  rating: Rating[];
}
