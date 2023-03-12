import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Hall } from './hall.entity';

@Injectable()
export class HallsRepository extends Repository<Hall> {
  constructor(
    @InjectRepository(Hall)
    repository: Repository<Hall>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
