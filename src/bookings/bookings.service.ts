import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus } from './booking-status.enum';
import { CreateBookingDto } from './dto/create-bookig.dto';
import { getBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { BookingsRepository } from './bookings.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async getBookingById(id: string): Promise<Booking> {
    const found = await this.bookingsRepository.findOneBy({ id: id });

    if (!found) throw new NotFoundException(`Task with ID ${id} not found`);

    return found;
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingsRepository.create(createBookingDto);

    await this.bookingsRepository.save(booking);

    return booking;
  }

  //   private bookings: Booking[] = [];
  //   getAllBookings(): Booking[] {
  //     return this.bookings;
  //   }
  //   getBookingWithFilters(filterDto: getBookingsFilterDto): Booking[] {
  //     const { projection_id, movie_id } = filterDto;
  //     const bookings = this.getAllBookings();
  //     return bookings.filter(
  //       (booking) =>
  //         booking.projection_id === parseInt(projection_id) ||
  //         booking.movie_id === parseInt(movie_id),
  //     );
  //   }
  //   getBookingById(id: string): Booking {
  //     const found = this.bookings.find((booking) => booking.id === id);
  //     if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
  //     return found;
  //   }
  //   deleteBookingById(id: string): void {
  //     const found = this.getBookingById(id);
  //     this.bookings = this.bookings.filter((booking) => booking.id !== id);
  //   }
  //   updateBookingSeat(id: string, seat: number): Booking {
  //     const booking = this.getBookingById(id);
  //     booking.seat = seat;
  //     return booking;
  //   }
  //   updateBookingStatus(id: string, status: BookingStatus): Booking {
  //     const booking = this.getBookingById(id);
  //     booking.status = status;
  //     return booking;
  //   }
}
