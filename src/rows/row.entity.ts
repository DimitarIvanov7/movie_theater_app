import { Hall } from 'src/halls/hall.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Row {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seats: number;

  @Column()
  num: number;

  @ManyToOne(() => Hall, (hall) => hall.id)
  hall: Hall;
}
