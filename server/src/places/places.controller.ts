import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  Query,
  Param,
} from '@nestjs/common';
import { PlaceDto } from './dto/place.dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('places')
export class PlacesController {
  constructor(
    private logger = new Logger('Places controller'),
    private placesService: PlacesService,
  ) {}

  @Post()
  createPlace(@Body() PlaceDto: PlaceDto): Promise<Place> {
    return this.placesService.createPlace(PlaceDto);
  }

  @Public()
  @Get('/all')
  getAllPlaces(): Promise<Place[]> {
    // this.logger.verbose(`Retrieving all bookings`);
    return this.placesService.getAllPlaces();
  }

  @Public()
  @Get(':id')
  getBooking(@Param('id') id: string): Promise<Place> {
    // this.logger.verbose(`Retrieving booking with id: ${id}`);
    return this.placesService.getOne(id);
  }
}
