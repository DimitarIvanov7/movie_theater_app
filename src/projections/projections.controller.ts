import { Controller, Post, Body } from '@nestjs/common';
import { CreateProjectionDto } from './create-projection.dto';
import { Projection } from './projection.entity';
import { ProjectionsService } from './projections.service';

@Controller('projections')
export class ProjectionsController {
  constructor(private ProjectionsService: ProjectionsService) {}

  @Post()
  createProjection(
    @Body() CreateProjectionDto: CreateProjectionDto,
  ): Promise<Projection> {
    return this.ProjectionsService.createProjection(CreateProjectionDto);
  }
}
