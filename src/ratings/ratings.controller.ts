import { Controller, Post, Body } from '@nestjs/common';
import { CreateRatingDto } from './create-rating.dto';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private RatingService: RatingsService) {}

  @Post()
  createRating(@Body() CreateRatingDto: CreateRatingDto): Promise<Rating> {
    return this.RatingService.createRating(CreateRatingDto);
  }
}
