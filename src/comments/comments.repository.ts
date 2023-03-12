import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(
    @InjectRepository(Comment)
    repository: Repository<Comment>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
