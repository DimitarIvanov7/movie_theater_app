import { Controller, Post, Body } from '@nestjs/common';
import { CreateMovieDto } from './create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() CreateMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(CreateMovieDto);
  }
}
