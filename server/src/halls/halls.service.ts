import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHallDto } from './create-hall.dto';
import { Hall } from './hall.entity';
import { HallsRepository } from './halls.repository';
import { In } from 'typeorm';

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

  async getAllHalls(): Promise<Hall[]> {
    return this.HallsRepository.getAllHallsWithPlaces();
  }

  async getHallById(id: string | string[]): Promise<Hall | Hall[]> {
    try {
      const record = this.HallsRepository.getHallsWithPlace(id);

      if (!record) throw new NotFoundException();
      return record;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('An error has occured');
    }
  }
}
