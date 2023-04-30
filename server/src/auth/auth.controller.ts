import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { AuthService } from './auth.service';
import { Tokens } from './models/tokens.type';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './user.entity';
import { RtGuard } from 'src/common/guards/rt.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @Post('/signup')
  createUser(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<Tokens> {
    return this.AuthService.signUp(AuthCredentialsDto);
  }

  @Public()
  @Post('/signin')
  singIn(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<Tokens> {
    return this.AuthService.signIn(AuthCredentialsDto);
  }

  @UseGuards(RtGuard)
  @Post('/logout')
  logout(@GetUser() user: User): Promise<void> {
    return this.AuthService.logout(user);
  }
}
