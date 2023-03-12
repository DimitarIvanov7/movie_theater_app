import { Projection } from 'src/projections/projection.entity';
import { Row } from 'src/rows/row.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { BookingStatus } from './booking-status.enum';

@Entity()
export class Booking {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  projectionId: string;

  @Column()
  rowId: string;

  @Column()
  seat: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Projection, (projection) => projection.id)
  projection: Projection;

  @ManyToOne(() => Row, (row) => row.id)
  row: Row;
}
