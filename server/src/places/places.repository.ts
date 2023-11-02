import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { NotFoundException } from '@nestjs/common';

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
}
