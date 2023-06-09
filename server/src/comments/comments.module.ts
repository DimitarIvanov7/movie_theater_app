import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
