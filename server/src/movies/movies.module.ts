import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService, MoviesRepository],
  controllers: [MoviesController],
})
export class MoviesModule {}
