import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsRepository } from './ratings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingsService, RatingsRepository],
  controllers: [RatingsController],
})
export class RatingsModule {}
