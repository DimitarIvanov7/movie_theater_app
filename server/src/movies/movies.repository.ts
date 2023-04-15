import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesRepository extends Repository<Movie> {
  constructor(
    @InjectRepository(Movie)
    repository: Repository<Movie>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
