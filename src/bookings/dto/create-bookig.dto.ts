import { IsNotEmpty, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { BookingStatus } from '../booking-status.enum';

export class CreateBookingDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  seat: number;

  @IsNotEmpty()
  @IsUUID(4)
  rowId: string;

  @IsNotEmpty()
  @IsUUID(4)
  projectionId: string;

  @IsNotEmpty()
  @IsUUID(4)
  userId: string;
}
