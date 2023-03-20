import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Booking } from './booking.entity';
import { BookingController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), AuthModule],
  controllers: [BookingController],
  providers: [BookingService, BookingsRepository],
})
export class BookingModule {}
