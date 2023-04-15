import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProjectionDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsOptional()
  @IsDate()
  date: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  ['3d']: boolean;

  @IsNotEmpty()
  movieId: string;

  @IsNotEmpty()
  hallId: string;
}
