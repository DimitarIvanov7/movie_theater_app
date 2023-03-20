import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './authCredentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  createUser(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.AuthService.signUp(AuthCredentialsDto);
  }

  @Post('/signin')
  singIn(
    @Body() AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.AuthService.signIn(AuthCredentialsDto);
  }
}
