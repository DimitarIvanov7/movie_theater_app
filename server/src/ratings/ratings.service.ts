import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRatingDto } from './create-rating.dto';
import { Rating } from './rating.entity';
import { RatingsRepository } from './ratings.repository';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingsRepository)
    private RatingsRepository: RatingsRepository,
  ) {}

  async createRating(CreateRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.RatingsRepository.create(CreateRatingDto);

    try {
      await this.RatingsRepository.save(rating);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return rating;
  }
}
