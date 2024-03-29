import { IsString } from 'class-validator';

export class AuthCredentialsSingInDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
