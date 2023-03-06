import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingsRepository])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
