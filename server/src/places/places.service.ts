import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaceDto } from './create-place.dto';
import { PlacesRepository } from './places.repository';
import { Place } from './place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlacesRepository)
    private placesRepository: PlacesRepository,
  ) {}

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placesRepository.create(createPlaceDto);

    try {
      await this.placesRepository.save(place);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return place;
  }
}
