import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlaceDto } from './create-place.dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post()
  createPlace(@Body() CreatePlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.createPlace(CreatePlaceDto);
  }
}
