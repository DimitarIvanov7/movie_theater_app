import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectionDto } from './dto/create-projection.dto';
import { Projection } from './projection.entity';
import { ProjectionsRepository } from './projections.repository';
import { PlacesRepository } from 'src/places/places.repository';
import { DeleteResult } from 'typeorm';
import { ProjectionFilter } from './dto/getList.dto';
import { getListData } from 'src/utils';
import { ListResult } from 'src/interface/reactAdmin';

@Injectable()
export class ProjectionsService {
  constructor(
    @InjectRepository(ProjectionsRepository)
    private ProjectionsRepository: ProjectionsRepository,

    @InjectRepository(PlacesRepository)
    private placesRepository: PlacesRepository,
  ) {}

  async createProjection(
    createProjectionDto: CreateProjectionDto,
  ): Promise<Projection> {
    const availiableHall = await this.placesRepository.getAvailiableHalls(
      createProjectionDto.placeId,
      createProjectionDto.date,
    );

    const projection = this.ProjectionsRepository.create({
      ...createProjectionDto,
      hall: availiableHall,
    });

    await this.ProjectionsRepository.save(projection);

    return projection;
  }

  async getProjections(
    ProjectionFilter: ProjectionFilter,
  ): Promise<ListResult<Projection[]>> {
    return getListData(this.ProjectionsRepository, ProjectionFilter);
  }

  async getProjectionById(id: string): Promise<Projection> {
    try {
      const projection = await this.ProjectionsRepository.findOneBy({ id });

      if (!projection) throw new NotFoundException();
      return projection;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('An error has occured');
    }
  }

  async updateProjection(
    id: string,
    projectionDto: CreateProjectionDto,
  ): Promise<Projection> {
    const oldProjection = await this.ProjectionsRepository.findOneBy({ id });

    const changePlace = oldProjection.placeId !== projectionDto.placeId;

    const changeDate = oldProjection.date !== projectionDto.date;

    const availiableHall =
      changePlace || changeDate
        ? await this.placesRepository.getAvailiableHalls(
            projectionDto.placeId,
            projectionDto.date,
          )
        : oldProjection.hall;

    const newPlace = changePlace
      ? await this.placesRepository.getPlace(projectionDto.placeId)
      : oldProjection.place;

    Object.assign(oldProjection, projectionDto);

    oldProjection.hall = availiableHall;

    oldProjection.place = newPlace;

    return this.ProjectionsRepository.save(oldProjection);
  }

  async deleteProjection(id: string): Promise<DeleteResult> {
    const result = await this.ProjectionsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return result;
  }
}
