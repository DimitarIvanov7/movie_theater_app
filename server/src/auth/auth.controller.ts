import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthCredentialsSingUpDto } from './dto/authCredentialsSingUp.dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces/tokens.type';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './user.entity';
import { RtGuard } from 'src/common/guards/rt.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthCredentialsSingInDto } from './dto/authCredentialsSingIn.dto';
import { GetJwtPayload } from './decorators/get-jwtPaload.decorator';
import { JwtPayloadWithRt } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @Post('/signup')
  createUser(
    @Body() AuthCredentialsSingUpDto: AuthCredentialsSingUpDto,
  ): Promise<Tokens> {
    return this.AuthService.signUp(AuthCredentialsSingUpDto);
  }

  @Public()
  @Post('/signin')
  singIn(
    @Body() AuthCredentialsSingInDto: AuthCredentialsSingInDto,
  ): Promise<Tokens> {
    return this.AuthService.signIn(AuthCredentialsSingInDto);
  }

  @UseGuards(RtGuard)
  @Post('/logout')
  logout(@GetUser() user: User): Promise<void> {
    return this.AuthService.logout(user);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  refresh(
    @GetJwtPayload('name') name: string,
    @GetJwtPayload('refreshToken') rt: string,
  ): Promise<Tokens> {
    return this.AuthService.refresh(name, rt);
  }
}
