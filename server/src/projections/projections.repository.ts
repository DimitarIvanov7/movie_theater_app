import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Projection } from './projection.entity';

@Injectable()
export class ProjectionsRepository extends Repository<Projection> {
  constructor(
    @InjectRepository(Projection)
    repository: Repository<Projection>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
