import { IsNotEmpty, IsEnum } from 'class-validator';
import { BookingStatus } from '../booking-status.enum';

export class CreateBookingDto {
  id?: string;
  @IsNotEmpty()
  seat: number;
  rowId: string;
  @IsNotEmpty()
  projectionId: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  movieId: string;
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
