import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { NotFoundException } from '@nestjs/common';
import { Hall } from 'src/halls/hall.entity';

@Injectable()
export class PlacesRepository extends Repository<Place> {
  constructor(
    @InjectRepository(Place)
    repository: Repository<Place>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getPlace(id: string): Promise<Place> {
    const found = this.findOneBy({ id });

    if (!found) throw new NotFoundException();

    return found;
  }

  async getAllCities(): Promise<string[]> {
    const query = this.createQueryBuilder('place').select('city');

    const data = await query.getRawMany();

    return data.map((data) => data.city);
  }

  async getBookings(cityIndex: number): Promise<Place[]> {
    const query = this.createQueryBuilder('place')
      .leftJoin('place.hall', 'hall')
      .where('place.city = :city', {
        city: cityIndex,
      });

    const data = await query.getRawMany();

    return data.map((data) => data.city);
  }

  async getAvailiableHalls(placeId: string, date: string): Promise<Hall> {
    const projectionsQuery = this.createQueryBuilder('place')
      .leftJoinAndSelect('place.halls', 'halls')
      .leftJoinAndSelect('halls.projections', 'projections')
      .where('place.id = :placeId', { placeId: placeId });

    const projectionsData = await projectionsQuery.getOne();

    const emptyHall = projectionsData.halls.find(
      (hall) => hall.projections.length < 1,
    );

    if (emptyHall) {
      return emptyHall;
    }

    const availiableHallsQuery = this.createQueryBuilder('place');
    availiableHallsQuery
      .leftJoinAndSelect('place.halls', 'halls')
      .leftJoinAndSelect('halls.projections', 'projections')
      .where(`place.id = :placeId`, { placeId })
      .andWhere(
        'halls.id NOT IN ' +
          availiableHallsQuery
            .subQuery()
            .select('hall.id')
            .from(Hall, 'hall')
            .leftJoin('hall.projections', 'projections')
            .leftJoin('hall.place', 'place')
            .where(`place.id = :placeId`, { placeId })
            .andWhere(
              `ABS(EXTRACT(EPOCH FROM ("date" AT TIME ZONE 'UTC' -  TO_TIMESTAMP(:date, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'UTC')) / 3600) < 4`,
              { date },
            )
            .getQuery(),
      );

    const availiableHalls = await availiableHallsQuery.getOne();

    if (!availiableHalls)
      throw new NotFoundException('No free halls for this time slot');

    return availiableHalls.halls[0];
  }
}
