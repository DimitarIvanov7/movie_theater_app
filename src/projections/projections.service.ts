import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectionDto } from './create-projection.dto';
import { Projection } from './projection.entity';
import { ProjectionsRepository } from './projections.repository';

@Injectable()
export class ProjectionsService {
  constructor(
    @InjectRepository(ProjectionsRepository)
    private ProjectionsRepository: ProjectionsRepository,
  ) {}

  async createProjection(
    CreateProjectionDto: CreateProjectionDto,
  ): Promise<Projection> {
    const projection = this.ProjectionsRepository.create(CreateProjectionDto);

    try {
      await this.ProjectionsRepository.save(projection);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return projection;
  }
}
