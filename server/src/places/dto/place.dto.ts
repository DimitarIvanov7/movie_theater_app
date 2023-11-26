import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateHallDto } from 'src/halls/create-hall.dto';

export class PlaceDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  city: number;

  @IsArray()
  @ValidateNested()
  halls: CreateHallDto[];

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  picture: string;
}
