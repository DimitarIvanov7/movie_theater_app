import { Controller, Post, Body } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}

  @Post()
  createComment(@Body() CreateCommentDto: CreateCommentDto): Promise<Comment> {
    return this.CommentsService.createComment(CreateCommentDto);
  }
}
