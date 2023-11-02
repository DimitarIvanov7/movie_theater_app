import { Place } from 'src/places/place.entity';
import { Projection } from 'src/projections/projection.entity';
import { Row } from 'src/rows/row.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Hall {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  num: number;

  @Column()
  placeId: string;

  @ManyToOne(() => Place, (place) => place.id)
  place: Place;

  @OneToMany(() => Row, (row) => row.hall)
  rows: Row[];

  @OneToMany(() => Projection, (projection) => projection.hall, { eager: true })
  projections: Projection[];
}
