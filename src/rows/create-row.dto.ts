import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateRowDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsUUID(4)
  hallId?: string;

  @IsNotEmpty()
  num: number;

  @IsNotEmpty()
  seats: number;
}
