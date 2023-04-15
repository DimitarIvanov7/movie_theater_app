import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHallDto } from './create-hall.dto';
import { Hall } from './hall.entity';
import { HallsRepository } from './halls.repository';

@Injectable()
export class HallsService {
  constructor(
    @InjectRepository(HallsRepository)
    private HallsRepository: HallsRepository,
  ) {}

  async createHall(CreateHallDto: CreateHallDto): Promise<Hall> {
    const hall = this.HallsRepository.create(CreateHallDto);

    try {
      await this.HallsRepository.save(hall);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return hall;
  }
}
