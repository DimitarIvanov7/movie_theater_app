import { BadRequestException, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceDto } from './dto/place.dto';
import { PlacesRepository } from './places.repository';
import { Place } from './place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlacesRepository)
    private placesRepository: PlacesRepository,
  ) {}

  async createPlace(placeDto: PlaceDto): Promise<Place> {
    const place = this.placesRepository.create(placeDto);

    try {
      await this.placesRepository.save(place);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('An error has occure');
    }

    return place;
  }

  async getAllPlaces(): Promise<Place[]> {
    try {
      const allRecords = await this.placesRepository.find();
      return allRecords;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('An error has occured');
    }
  }

  async getOne(id: string): Promise<Place> {
    return this.placesRepository.getPlace(id);
  }
}
