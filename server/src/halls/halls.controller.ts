import { Controller, Post, Body } from '@nestjs/common';
import { CreateHallDto } from './create-hall.dto';
import { Hall } from './hall.entity';
import { HallsService } from './halls.service';

@Controller('halls')
export class HallsController {
  constructor(private hallsService: HallsService) {}

  @Post()
  createHall(@Body() createHallDto: CreateHallDto): Promise<Hall> {
    return this.hallsService.createHall(createHallDto);
  }
}
