import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Hall } from './hall.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class HallsRepository extends Repository<Hall> {
  constructor(
    @InjectRepository(Hall)
    repository: Repository<Hall>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getAllHallsWithPlaces(): Promise<Hall[]> {
    const query = this.createQueryBuilder('halls').leftJoinAndSelect(
      'halls.place',
      'place',
    );

    try {
      const data = await query.getMany();

      if (!data) throw new NotFoundException();

      return data;
    } catch (e) {
      console.log(e);

      throw new BadRequestException('An error has occured');
    }
  }

  async getHallsWithPlace(id: string | string[]): Promise<Hall[] | Hall> {
    const query = this.createQueryBuilder('halls')
      .leftJoinAndSelect('halls.place', 'place')
      .where('halls.id = :hall', { hall: id });

    const data = Array.isArray(id)
      ? await query.getMany()
      : await query.getOne();

    if (!data) throw new NotFoundException();

    return data;
  }
}
