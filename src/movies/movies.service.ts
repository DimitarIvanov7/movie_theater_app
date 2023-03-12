import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private MoviesRepository: MoviesRepository,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.MoviesRepository.create(createMovieDto);

    try {
      await this.MoviesRepository.save(movie);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return movie;
  }
}
