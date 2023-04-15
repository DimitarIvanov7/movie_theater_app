import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-bookig.dto';
import { BookingsRepository } from './bookings.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BookedSeat } from './bookedSeat.entity';
import { DeepPartial } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { GetBookingDto } from './dto/get-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<BookedSeat[]> {
    return this.bookingsRepository.createBooking(createBookingDto, user);
  }

  async getAllBookings(
    user: User,
    GetBookingsFilterDto: GetBookingsFilterDto,
  ): Promise<GetBookingDto[]> {
    return this.bookingsRepository.getAllBookings(user, GetBookingsFilterDto);
  }

  async getBooking(id: string, user: User): Promise<GetBookingDto> {
    return this.bookingsRepository.getBooking(id, user);
  }

  async deleteBooking(id: string, user: User): Promise<void> {
    const result = await this.bookingsRepository.deleteBooking(id, user);
  }

  //   private bookings: BookedSeat[] = [];
  //   getAllBookings(): BookedSeat[] {
  //     return this.bookings;
  //   }
  //   getBookingWithFilters(filterDto: getBookingsFilterDto): BookedSeat[] {
  //     const { projection_id, movie_id } = filterDto;
  //     const bookings = this.getAllBookings();
  //     return bookings.filter(
  //       (booking) =>
  //         booking.projection_id === parseInt(projection_id) ||
  //         booking.movie_id === parseInt(movie_id),
  //     );
  //   }
  //   getBookingById(id: string): BookedSeat {
  //     const found = this.bookings.find((booking) => booking.id === id);
  //     if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
  //     return found;
  //   }
  //   updateBookingSeat(id: string, seat: number): BookedSeat {
  //     const booking = this.getBookingById(id);
  //     booking.seat = seat;
  //     return booking;
  //   }
  //   updateBookingStatus(id: string, status: BookingStatus): BookedSeat {
  //     const booking = this.getBookingById(id);
  //     booking.status = status;
  //     return booking;
  //   }
}
