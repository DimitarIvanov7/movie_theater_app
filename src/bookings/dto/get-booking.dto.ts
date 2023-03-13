import { IsNotEmpty } from 'class-validator';

export class GetBookingDto {
  @IsNotEmpty()
  projectionId: string;

  @IsNotEmpty()
  userId: string;
}
