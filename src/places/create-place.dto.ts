import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePlaceDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  picture: string;
}
