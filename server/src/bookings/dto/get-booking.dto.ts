import { IsNotEmpty } from 'class-validator';

export class GetBookingDto {
  @IsNotEmpty()
  movie_name: string;

  @IsNotEmpty()
  movie_image: string;

  @IsNotEmpty()
  movie_length_minutes: number;

  @IsNotEmpty()
  row_num: number;

  @IsNotEmpty()
  hall_num: number;

  @IsNotEmpty()
  place_num: string;

  @IsNotEmpty()
  booking_created_at: Date;

  @IsNotEmpty()
  seats: number[];
}
