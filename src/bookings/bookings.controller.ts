import { Body, Controller, Get, Post, Patch } from '@nestjs/common';
import { Delete, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { Booking } from './booking.entity';
import { BookingService } from './bookings.service';
import { CreateBookingDto } from './dto/create-bookig.dto';
import { GetBookingDto } from './dto/get-booking.dto';
// import { getBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
@UseGuards(AuthGuard())
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  createBooking(@Body() CreateBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(CreateBookingDto);
  }

  @Get()
  getBooking(@Query() getBookingDto: GetBookingDto): Promise<Booking> {
    return this.bookingService.getBooking(getBookingDto);
  }

  @Delete()
  deleteBookingById(@Query() getBookingDto: GetBookingDto): Promise<void> {
    return this.bookingService.deleteBooking(getBookingDto);
  }

  // @Get()
  // getAllBookings(@Query() filterDto: getBookingsFilterDto): Booking[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.bookingService.getBookingWithFilters(filterDto);
  //   } else return this.bookingService.getAllBookings();
  // }

  // @Patch('/:id/seat')
  // updateBookingSeat(
  //   @Param('id') id: string,
  //   @Body('seat') seat: number,
  // ): Booking {
  //   console.log(seat);

  //   return this.bookingService.updateBookingSeat(id, seat);
  // }

  // @Patch('/:id/status')
  // updateBookingStatus(
  //   @Param('id') id: string,
  //   @Body() UpdateBookingStatusDto: UpdateBookingStatusDto,
  // ): Booking {
  //   const { status } = UpdateBookingStatusDto;
  //   return this.bookingService.updateBookingStatus(id, status);
  // }
}
