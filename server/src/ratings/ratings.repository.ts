import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.entity';

@Injectable()
export class RatingsRepository extends Repository<Rating> {
  constructor(
    @InjectRepository(Rating)
    repository: Repository<Rating>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
