import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsSingUpDto } from './dto/authCredentialsSingUp.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';

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

  async createUser(
    AuthCredentialsSingUpDto: AuthCredentialsSingUpDto,
  ): Promise<User> {
    const { name, password, email } = AuthCredentialsSingUpDto;

    const hashedPassword = await argon2.hash(password);
    const user = this.create({
      name,
      email,
      password: hashedPassword,
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
    const hashedRefreshToken = await argon2.hash(refreshToken);

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
