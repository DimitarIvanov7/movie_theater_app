import { Controller, Post, Body, Get, Logger, Param } from '@nestjs/common';
import { PlaceDto } from './dto/place.dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService, private logger: Logger) {}

  @Post()
  createPlace(@Body() PlaceDto: PlaceDto): Promise<Place> {
    return this.placesService.createPlace(PlaceDto);
  }

  @Public()
  @Get('/all')
  getAllPlaces(): Promise<Place[]> {
    this.logger.verbose(`Retrieving all places`);
    return this.placesService.getAllPlaces();
  }

  @Public()
  @Get(':id')
  getBooking(@Param('id') id: string): Promise<Place> {
    this.logger.verbose(`Retrieving place with id: ${id}`);
    return this.placesService.getOne(id);
  }
}
