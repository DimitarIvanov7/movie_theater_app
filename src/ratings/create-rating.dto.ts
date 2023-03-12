import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRatingDto {
  @IsUUID(4)
  movieId?: string;

  @IsUUID(4)
  userId?: string;

  @IsNotEmpty()
  rating: number;
}
