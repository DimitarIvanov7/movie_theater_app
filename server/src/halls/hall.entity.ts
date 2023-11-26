import { Place } from 'src/places/place.entity';
import { Projection } from 'src/projections/projection.entity';
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

  @Column({ default: 20 })
  rows: number;

  @Column({ default: 20 })
  seats: number;

  @ManyToOne(() => Place, (place) => place.id, {
    onDelete: 'CASCADE',
  })
  place: Place;

  @OneToMany(() => Projection, (projection) => projection.hall, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  projections: Projection[];
}
