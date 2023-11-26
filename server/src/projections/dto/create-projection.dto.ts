import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectionDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsString()
  date: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  ['3d']: boolean;

  @IsNotEmpty()
  movieId: string;

  @IsNotEmpty()
  placeId: string;
}
