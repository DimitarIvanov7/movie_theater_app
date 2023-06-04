import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsSingUpDto } from './dto/authCredentialsSingUp.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Tokens } from './interfaces/tokens.type';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

import * as argon2 from 'argon2';

import { AuthCredentialsSingInDto } from './dto/authCredentialsSingIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(
    AuthCredentialsSingUpDto: AuthCredentialsSingUpDto,
  ): Promise<Tokens> {
    const user = await this.userRepository.createUser(AuthCredentialsSingUpDto);

    const tokens = await this.getTokens(user.name);

    await this.userRepository.updateRefreshTokenHash(
      user.id,
      tokens.refreshToken,
    );

    return tokens;
  }

  async signIn(
    AuthCredentialsSingInDto: AuthCredentialsSingInDto,
  ): Promise<Tokens> {
    const { name, password } = AuthCredentialsSingInDto;

    const user = await this.userRepository.findOneBy({ name });

    if (user && (await argon2.verify(user.password, password))) {
      const tokens = await this.getTokens(name);
      await this.userRepository.updateRefreshTokenHash(
        user.id,
        tokens.refreshToken,
      );

      return tokens;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  async logout(user: User): Promise<void> {
    return this.userRepository.deleteRefreshToken(user);
  }

  async refresh(name: string, rt: string): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({ name });

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Access denied');

    const rtMatches = await argon2.verify(user.refreshToken, rt);

    if (!rtMatches) throw new UnauthorizedException('Access denied');

    const tokens = await this.getTokens(user.name);

    await this.userRepository.updateRefreshTokenHash(
      user.id,
      tokens.refreshToken,
    );

    return tokens;
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
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
