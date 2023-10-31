import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class PlaceDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  picture: string;
}
