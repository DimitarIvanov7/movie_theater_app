import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { name, password } = AuthCredentialsDto;

    const passSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, passSalt);

    const rtSalt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(name, rtSalt);

    const user = this.create({
      name,
      password: hashedPassword,
      refreshToken: hashedRefreshToken,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    const user = await this.getUserById(userId);

    user.refreshToken = hashedRefreshToken;

    this.save(user);
  }

  async deleteRefreshToken(user: User) {
    const query = this.createQueryBuilder()
      .update(User)
      .set({ ...user, refreshToken: null })
      .where({ user })
      .andWhere('user.refreshToken IS NOT NULL')
      .execute();

    const result = await query;

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
