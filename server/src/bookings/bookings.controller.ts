import { Body, Controller, Get, Post, Patch } from '@nestjs/common';
import { Delete, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { BookedSeat } from './bookedSeat.entity';
import { BookingService } from './bookings.service';
import { CreateBookingDto } from './dto/create-bookig.dto';
// import { GetBookingDto } from './dto/get-booking.dto';
// import { getBookingsFilterDto } from './dto/get-bookings-filter.dto';
// import { UpdateBookingStatusDto } from './dto/update-booking-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { GetBookingDto } from './dto/get-booking.dto';
import { Logger } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('bookings')
// @UseGuards(AuthGuard('jwt-access'))
export class BookingController {
  private logger = new Logger('Bookings controller');
  constructor(private bookingService: BookingService) {}

  @Post()
  createBooking(
    @Body() CreateBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<BookedSeat[]> {
    return this.bookingService.createBooking(CreateBookingDto, user);
  }

  @Get('/all')
  getAllBookings(
    @Query() GetBookingsFilterDto: GetBookingsFilterDto,
    @GetUser() user: User,
  ): Promise<GetBookingDto[]> {
    this.logger.verbose(
      `User ${user.name} retrieving all bookings with filter: ${JSON.stringify(
        GetBookingsFilterDto,
      )}`,
    );
    return this.bookingService.getAllBookings(user, GetBookingsFilterDto);
  }

  @Get(':id')
  getBooking(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<GetBookingDto> {
    this.logger.verbose(`User ${user.name} retrieving booking with id: ${id}`);
    return this.bookingService.getBooking(id, user);
  }

  @Delete(':id')
  deleteBookingById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.bookingService.deleteBooking(id, user);
  }

  // @Get()
  // getAllBookings(@Query() filterDto: getBookingsFilterDto): BookedSeat[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.bookingService.getBookingWithFilters(filterDto);
  //   } else return this.bookingService.getAllBookings();
  // }

  // @Patch('/:id/seat')
  // updateBookingSeat(
  //   @Param('id') id: string,
  //   @Body('seat') seat: number,
  // ): BookedSeat {
  //   console.log(seat);

  //   return this.bookingService.updateBookingSeat(id, seat);
  // }

  // @Patch('/:id/status')
  // updateBookingStatus(
  //   @Param('id') id: string,
  //   @Body() UpdateBookingStatusDto: UpdateBookingStatusDto,
  // ): BookedSeat {
  //   const { status } = UpdateBookingStatusDto;
  //   return this.bookingService.updateBookingStatus(id, status);
  // }
}
