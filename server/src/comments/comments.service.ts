import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private CommentsRepository: CommentsRepository,
  ) {}

  async createComment(CreateCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.CommentsRepository.create(CreateCommentDto);

    try {
      await this.CommentsRepository.save(comment);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong data');
    }

    return comment;
  }
}
