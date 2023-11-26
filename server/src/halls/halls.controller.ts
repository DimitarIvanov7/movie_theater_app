import { Controller, Post, Body, Get, Logger, Query } from '@nestjs/common';
import { CreateHallDto } from './create-hall.dto';
import { Hall } from './hall.entity';
import { HallsService } from './halls.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('halls')
export class HallsController {
  constructor(private hallsService: HallsService, private logger: Logger) {}

  @Post()
  createHall(@Body() createHallDto: CreateHallDto): Promise<Hall> {
    return this.hallsService.createHall(createHallDto);
  }

  @Public()
  @Get()
  getAllHalls(
    @Query('ids') ids: string | undefined | string[],
  ): Promise<Hall[] | Hall> {
    this.logger.verbose(`Retrieving all halls`);

    console.log(ids);

    if (ids) {
      return this.hallsService.getHallById(ids);
    }

    return this.hallsService.getAllHalls();
  }
}
