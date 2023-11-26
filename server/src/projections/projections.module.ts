import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projection } from './projection.entity';
import { ProjectionsController } from './projections.controller';
import { ProjectionsRepository } from './projections.repository';
import { ProjectionsService } from './projections.service';
import { PlacesRepository } from 'src/places/places.repository';
import { Place } from 'src/places/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projection, Place])],
  controllers: [ProjectionsController],
  providers: [ProjectionsService, ProjectionsRepository, PlacesRepository],
})
export class ProjectionsModule {}
