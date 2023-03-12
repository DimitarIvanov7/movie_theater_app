import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RowsRepository } from './row.repository';
import { CreateRowDto } from './create-row.dto';
import { Row } from './row.entity';

@Injectable()
export class RowsService {
  constructor(
    @InjectRepository(RowsRepository)
    private RowsRepository: RowsRepository,
  ) {}

  async createRow(CreateRowDto: CreateRowDto): Promise<Row> {
    const row = this.RowsRepository.create(CreateRowDto);

    try {
      await this.RowsRepository.save(row);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return row;
  }
}
