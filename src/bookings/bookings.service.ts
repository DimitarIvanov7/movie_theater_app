import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-bookig.dto';
import { BookingsRepository } from './bookings.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { DeepPartial } from 'typeorm';
import { GetBookingDto } from './dto/get-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingsRepository.create(createBookingDto);

    try {
      await this.bookingsRepository.save(booking);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return booking;
  }

  async getBooking(getBookingDto: GetBookingDto): Promise<Booking> {
    const found = await this.bookingsRepository.findOneBy(getBookingDto);

    if (!found)
      throw new NotFoundException(
        `Booking with userId ${getBookingDto.userId} and projectionId ${getBookingDto.projectionId} not found`,
      );

    return found;
  }

  async deleteBooking(getBookingDto: GetBookingDto): Promise<void> {
    const result = await this.bookingsRepository.delete(getBookingDto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Booking with userId ${getBookingDto.userId} and projectionId ${getBookingDto.projectionId} not found`,
      );
    }
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
