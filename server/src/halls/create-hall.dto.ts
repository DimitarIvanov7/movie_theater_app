import { IsNotEmpty, IsEnum, IsUUID, IsOptional } from 'class-validator';

export class CreateHallDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  num: number;

  @IsNotEmpty()
  rows: number;

  @IsNotEmpty()
  seats: number;

  @IsNotEmpty()
  @IsUUID(4)
  placeId: string;
}
