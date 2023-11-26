import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  Param,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { PlaceDto } from './dto/place.dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';
import { Public } from 'src/common/decorators/public.decorator';
import { DeleteResult } from 'typeorm';
import { PlaceFilter } from './dto/getList.dto';
import { ListResult } from 'src/interface/reactAdmin';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService, private logger: Logger) {}

  //temporary public for test purposes
  @Public()
  @Post()
  createPlace(@Body() PlaceDto: PlaceDto): Promise<Place> {
    return this.placesService.createPlace(PlaceDto);
  }

  @Public()
  @Get()
  getAllPlaces(
    @Query() placeFilter: PlaceFilter,
  ): Promise<ListResult<Place[]>> {
    this.logger.verbose(`Retrieving all places`);
    return this.placesService.getAllPlaces(placeFilter);
  }

  @Public()
  @Get('/cities')
  getCities(): Promise<string[]> {
    this.logger.verbose(`Retrieving all cities`);
    return this.placesService.getAllCities();
  }

  @Public()
  @Get(':id')
  getPlace(@Param('id') id: string): Promise<Place> {
    this.logger.verbose(`Retrieving place with id: ${id}`);
    return this.placesService.getOne(id);
  }

  @Public()
  @Get('bookings')
  getAllBookings(@Query() index: number): Promise<Place[]> {
    return this.placesService.getBookings(index);
  }

  //temporary public for test purposes
  @Public()
  @Put(':id')
  updatePlace(
    @Param('id') id: string,
    @Body() placeDto: PlaceDto,
  ): Promise<Place> {
    this.logger.verbose(`Updating place with id: ${id}`);
    return this.placesService.updatePlace(id, placeDto);
  }

  //temporary public for test purposes
  @Public()
  @Delete(':id')
  deletePlace(@Param('id') id: string): Promise<DeleteResult> {
    this.logger.verbose(`Deleting place with id: ${id}`);
    return this.placesService.deletePlace(id);
  }
}
