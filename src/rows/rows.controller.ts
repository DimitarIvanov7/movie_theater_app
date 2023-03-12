import { Controller, Post, Body } from '@nestjs/common';
import { CreateRowDto } from './create-row.dto';
import { Row } from './row.entity';
import { RowsService } from './rows.service';

@Controller('rows')
export class RowsController {
  constructor(private rowsService: RowsService) {}

  @Post()
  createRow(@Body() createRowDto: CreateRowDto): Promise<Row> {
    return this.rowsService.createRow(createRowDto);
  }
}
