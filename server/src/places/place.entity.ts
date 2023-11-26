import { Hall } from 'src/halls/hall.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Hall, (hall) => hall.place, {
    eager: true,
    cascade: true,
  })
  halls: Hall[];
}
