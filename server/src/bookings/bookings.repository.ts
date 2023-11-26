import {
  DeleteResult,
  In,
  QueryBuilder,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { BookedSeat } from './bookedSeat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-bookig.dto';
import { User } from 'src/auth/user.entity';
import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { GetBookingDto } from './dto/get-booking.dto';

@Injectable()
export class BookingsRepository extends Repository<BookedSeat> {
  private logger = new Logger();
  constructor(
    @InjectRepository(BookedSeat)
    repository: Repository<BookedSeat>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  private buildBookingJoin(): SelectQueryBuilder<BookedSeat> {
    const queryBuilder = this.createQueryBuilder('booking');
    return queryBuilder
      .innerJoin(
        'booking.projection',
        'projection',
        'projection.id = booking.projectionId',
      )
      .innerJoin('projection.movie', 'movie', 'movie.id = projection.movieId')
      .innerJoin('projection.hall', 'hall', 'hall.id = projection.hallId')
      .innerJoin('hall.place', 'place', 'place.id = hall.placeId');
  }

  async getBooking(id: string, user: User): Promise<GetBookingDto> {
    const query = this.buildBookingJoin();
    query
      .select([
        'ARRAY_AGG(booking.seat) AS seats',
        'booking.created_at',
        'place.name',
        'place.city',
        'hall.num',
        'booking.row',
        'movie.name',
        'movie.image',
        'movie.length_minutes',
      ])
      .groupBy(
        'booking.created_at, place.name, place.city, hall.num, booking.row, movie.name, movie.image, movie.length_minutes',
      )
      .where({ user, id });

    const found = await query.getRawOne();

    if (!found) throw new NotFoundException();

    return found;
  }

  async getAllBookings(
    user: User,
    getBookingsFilterDto: GetBookingsFilterDto,
  ): Promise<GetBookingDto[]> {
    const { startDate, endDate, movieName } = getBookingsFilterDto;

    const query = this.buildBookingJoin();
    query
      .select([
        'ARRAY_AGG(booking.seat) AS seats',
        'booking.created_at',
        'place.name',
        'place.city',
        'hall.num',
        'booking.row',
        'movie.name',
        'movie.image',
        'movie.length_minutes',
      ])
      .groupBy(
        'booking.created_at, place.name, place.city, hall.num, booking.row, movie.name, movie.image, movie.length_minutes',
      )
      .where({ user });
    if (movieName) {
      query.andWhere('LOWER(movie.name) LIKE LOWER(:movieName)', {
        movieName: `%${movieName}%`,
      });
    }

    if (startDate) {
      if (isNaN(Date.parse(startDate))) {
        throw new BadRequestException('Invalid date format');
      }
      query.andWhere('booking.created_at >= :startDate', {
        startDate: startDate,
      });
    }

    if (endDate) {
      if (isNaN(Date.parse(endDate))) {
        throw new BadRequestException('Invalid date format');
      }
      query.andWhere('booking.created_at <= :endDate', {
        endDate: endDate,
      });
    }

    try {
      const bookings = query.getRawMany();
      return bookings;
    } catch (error) {
      this.logger.error(
        `Failed to get bookings for user "${
          user.name
        }". Filters: ${JSON.stringify(getBookingsFilterDto)} `,
      );
      throw new InternalServerErrorException();
    }
  }
  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<BookedSeat[]> {
    const { row, projectionId, seats } = createBookingDto;

    const initialArr: BookedSeat[] = [];

    const exists = await this.findOne({
      where: {
        row,
        projectionId,
        seat: In(seats),
      },
    });

    if (exists)
      throw new ConflictException(`Seat ${exists.seat} is already taken`);

    const booking = seats.reduce(
      (prev: BookedSeat[], seat: number) => [
        ...prev,
        { row, projectionId, seat: seat, user },
      ],
      initialArr,
    );

    const createBooking = this.create(booking);

    try {
      await this.save(createBooking);
    } catch (err) {
      throw new BadRequestException();
    }

    return createBooking;
  }

  async deleteBooking(id: string, user: User): Promise<DeleteResult> {
    const query = this.createQueryBuilder('bookings')
      .delete()
      .where({ id, user })
      .execute();

    const result = await query;

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return result;
  }
}
