import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesRepository } from './places.repository';
import { Place } from './place.entity';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { HallsRepository } from 'src/halls/halls.repository';
import { Hall } from 'src/halls/hall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Hall])],
  controllers: [PlacesController],
  providers: [PlacesRepository, Logger, PlacesService, HallsRepository],
})
export class PlacesModule {}
