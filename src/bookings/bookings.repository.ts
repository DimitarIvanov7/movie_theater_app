import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsRepository extends Repository<Booking> {}
