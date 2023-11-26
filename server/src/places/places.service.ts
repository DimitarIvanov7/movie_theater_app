import {
  BadRequestException,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceDto } from './dto/place.dto';
import { PlacesRepository } from './places.repository';
import { Place } from './place.entity';
import { HallsRepository } from 'src/halls/halls.repository';
import { Hall } from 'src/halls/hall.entity';
import { CreateHallDto } from 'src/halls/create-hall.dto';
import { DeleteResult, In } from 'typeorm';
import { PlaceFilter } from './dto/getList.dto';
import { getListData } from 'src/utils';
import { ListResult } from 'src/interface/reactAdmin';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlacesRepository)
    private placesRepository: PlacesRepository,
    private hallsRepository: HallsRepository,
  ) {}

  async createPlace(placeDto: PlaceDto): Promise<Place> {
    const { halls, ...rest } = placeDto;

    const place = this.placesRepository.create(rest);

    const createdPlace = await this.placesRepository.save(place);

    const newHalls = halls.map((hall) => ({
      ...hall,
      place: createdPlace,
    }));

    const createHalls = this.hallsRepository.create(newHalls);

    await this.hallsRepository.save(createHalls);

    return { ...place, halls: createHalls };
  }

  async getAllPlaces(placeFilter: PlaceFilter): Promise<ListResult<Place[]>> {
    return getListData(this.placesRepository, placeFilter);
  }

  async getOne(id: string): Promise<Place> {
    return this.placesRepository.getPlace(id);
  }

  async getAllCities(): Promise<string[]> {
    return this.placesRepository.getAllCities();
  }

  async getBookings(cityIndex: number): Promise<Place[]> {
    return this.placesRepository.getBookings(cityIndex);
  }

  async deletePlace(id: string): Promise<DeleteResult> {
    const result = await this.placesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return result;
  }

  async updatePlace(id: string, placeDto: PlaceDto): Promise<Place> {
    const oldPlace = await this.placesRepository.findOneBy({ id });

    const hallsToInclude = oldPlace.halls.filter((hall) =>
      placeDto.halls.map((hall) => hall.num).includes(hall.num),
    );

    //delete halls
    if (hallsToInclude.length < oldPlace.halls.length) {
      const hallsToRemove = oldPlace.halls.filter(
        (hall) => !hallsToInclude.map((hall) => hall.id).includes(hall.id),
      );

      const deleteHalls = await this.hallsRepository.find({
        where: {
          id: In(hallsToRemove.map((hall) => hall.id)),
        },
      });

      await this.hallsRepository.remove(deleteHalls);
    }

    const hallsToCreate = placeDto.halls.filter(
      (halls) => !oldPlace.halls.map((hall) => hall.num).includes(halls.num),
    );

    const newHalls = hallsToCreate.length
      ? this.hallsRepository.create(hallsToCreate)
      : [];

    const updatedHalls = hallsToInclude.map((hall, index) => ({
      ...hall,
      num: placeDto.halls[index].num,
      rows: placeDto.halls[index].rows,
      seats: placeDto.halls[index].seats,
    }));

    Object.assign(oldPlace, placeDto);
    oldPlace.halls = [...updatedHalls, ...newHalls];

    return this.placesRepository.save(oldPlace);
  }
}
