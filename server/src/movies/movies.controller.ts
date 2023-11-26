import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { Public } from 'src/common/decorators/public.decorator';
import { movieFilterDto } from './dto/movieFilterDto.dto';
import { ListResult } from 'src/interface/reactAdmin';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService, private logger: Logger) {}

  @Post()
  createMovie(@Body() CreateMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(CreateMovieDto);
  }

  @Public()
  @Get()
  getAllMovies(
    @Query() movieFilterDto: movieFilterDto,
  ): Promise<ListResult<Movie[]>> {
    this.logger.verbose(
      `Retrieving all movies with: page=${movieFilterDto.page}, perPage=${movieFilterDto.perPage}`,
    );
    return this.moviesService.getAllMovies(movieFilterDto);
  }

  @Public()
  @Get(':id')
  getMovieById(@Param('id') id: string): Promise<Movie[] | Movie> {
    this.logger.verbose(`Retrieving movie ${id}`);
    return this.moviesService.getMovieById(id);
  }
}
