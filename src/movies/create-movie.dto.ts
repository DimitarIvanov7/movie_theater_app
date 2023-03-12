import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  length_minutes: number;

  @IsNotEmpty()
  image: string;
}
