import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './authCredentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { name, password } = AuthCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ name, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
