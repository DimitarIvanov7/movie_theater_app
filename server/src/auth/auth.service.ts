import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './models/jwt-payload.interface';
import { Tokens } from './models/tokens.type';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<Tokens> {
    const user = await this.userRepository.createUser(AuthCredentialsDto);

    const tokens = await this.getTokens(user.name);

    return tokens;
  }

  async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<Tokens> {
    const { name, password } = AuthCredentialsDto;

    const user = await this.userRepository.findOneBy({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const tokens = await this.getTokens(name);
      await this.userRepository.updateRefreshTokenHash(
        user.id,
        tokens.refresh_token,
      );

      return tokens;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  async logout(user: User): Promise<void> {
    return this.userRepository.deleteRefreshToken(user);
  }

  async getTokens(name: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          name,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: 60 * 15,
        },
      ),

      this.jwtService.signAsync(
        {
          name,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: 60 * 15 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
