import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { Booking } from './booking.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingsRepository extends Repository<Booking> {
  constructor(
    @InjectRepository(Booking)
    repository: Repository<Booking>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
