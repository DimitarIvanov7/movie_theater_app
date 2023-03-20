import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './authCredentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(AuthCredentialsDto);
  }

  async signIn(
    AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { name, password } = AuthCredentialsDto;

    const user = await this.userRepository.findOneBy({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { name };

      const accessToken: string = await this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
