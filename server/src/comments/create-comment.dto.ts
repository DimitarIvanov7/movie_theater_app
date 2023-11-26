import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsOptional()
  @IsUUID(4)
  commentId: string;

  @IsNotEmpty()
  @IsUUID(4)
  movieId: string;

  @IsNotEmpty()
  text: string;
}
