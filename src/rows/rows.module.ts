import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Row } from './row.entity';
import { RowsRepository } from './row.repository';
import { RowsController } from './rows.controller';
import { RowsService } from './rows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Row])],
  controllers: [RowsController],
  providers: [RowsService, RowsRepository],
})
export class RowsModule {}
