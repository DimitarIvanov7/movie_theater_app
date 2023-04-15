import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hall } from './hall.entity';
import { HallsRepository } from './halls.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hall])],
  providers: [HallsService, HallsRepository],
  controllers: [HallsController],
})
export class HallsModule {}
