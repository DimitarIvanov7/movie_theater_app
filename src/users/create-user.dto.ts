import {
  isDate,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsDate()
  created_at?: string;
}
