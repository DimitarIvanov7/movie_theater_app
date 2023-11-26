import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';
import { In } from 'typeorm';
import { movieFilterDto } from './dto/movieFilterDto.dto';
import { ListResult } from 'src/interface/reactAdmin';
import { getListData } from 'src/utils';

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

  async getAllMovies(
    movieFilterDto: movieFilterDto,
  ): Promise<ListResult<Movie[]>> {
    // const skip =
    //   (Number(movieFilterDto.page) - 1) * Number(movieFilterDto.perPage);

    // const total = await this.MoviesRepository.count();

    // const result = await this.MoviesRepository.find({
    //   take: Number(movieFilterDto.perPage),
    //   skip,
    // });

    // return {
    //   data: result,
    //   total: total,
    // };

    return getListData(this.MoviesRepository, movieFilterDto);
  }

  async getMovieById(id: string | string[]): Promise<Movie | Movie[]> {
    try {
      const record = Array.isArray(id)
        ? await this.MoviesRepository.find({ where: { id: In(id) } })
        : await this.MoviesRepository.findOneBy({ id });

      if (!record) throw new NotFoundException();
      return record;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('An error has occured');
    }
  }
}
