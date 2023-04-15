import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projection } from './projection.entity';
import { ProjectionsController } from './projections.controller';
import { ProjectionsRepository } from './projections.repository';
import { ProjectionsService } from './projections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projection])],
  controllers: [ProjectionsController],
  providers: [ProjectionsService, ProjectionsRepository],
})
export class ProjectionsModule {}
