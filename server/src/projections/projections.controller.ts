import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProjectionDto } from './dto/create-projection.dto';
import { Projection } from './projection.entity';
import { ProjectionsService } from './projections.service';
import { Public } from 'src/common/decorators/public.decorator';
import { DeleteResult } from 'typeorm';
import { ProjectionFilter } from './dto/getList.dto';
import { ListResult } from 'src/interface/reactAdmin';

@Controller('projections')
export class ProjectionsController {
  constructor(private ProjectionsService: ProjectionsService) {}

  //temporary public
  @Public()
  @Post()
  createProjection(
    @Body() CreateProjectionDto: CreateProjectionDto,
  ): Promise<Projection> {
    return this.ProjectionsService.createProjection(CreateProjectionDto);
  }

  @Public()
  @Get()
  getAllProjections(
    @Query() ProjectionFilter: ProjectionFilter,
  ): Promise<ListResult<Projection[]>> {
    return this.ProjectionsService.getProjections(ProjectionFilter);
  }

  @Public()
  @Get(':id')
  getProjectionById(@Param('id') id: string): Promise<Projection> {
    return this.ProjectionsService.getProjectionById(id);
  }

  //temporary public for test purposes
  @Public()
  @Put(':id')
  updateProjection(
    @Param('id') id: string,
    @Body() projectionDto: CreateProjectionDto,
  ): Promise<Projection> {
    return this.ProjectionsService.updateProjection(id, projectionDto);
  }

  //temporary public for test purposes
  @Public()
  @Delete(':id')
  deleteProjection(@Param('id') id: string): Promise<DeleteResult> {
    return this.ProjectionsService.deleteProjection(id);
  }
}
