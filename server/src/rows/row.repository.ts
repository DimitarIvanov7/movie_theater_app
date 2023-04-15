import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Row } from './row.entity';

@Injectable()
export class RowsRepository extends Repository<Row> {
  constructor(
    @InjectRepository(Row)
    repository: Repository<Row>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
