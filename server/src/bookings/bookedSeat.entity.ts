import { Projection } from 'src/projections/projection.entity';
import { User } from 'src/auth/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  Timestamp,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from './booking-status.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class BookedSeat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seat: number;

  @Column({ default: 7 })
  row: number;

  @Column()
  projectionId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Timestamp;

  @ManyToOne(() => User, (user) => user.id)
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Projection, (projection) => projection.id)
  projection: Projection;
}
