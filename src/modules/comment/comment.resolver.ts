import { Query, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { Comment as PrismaComment } from '@prisma/client';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment], { name: 'comments' })
  async findAll(): Promise<PrismaComment[]> {
    return await this.commentService.findAll();
  }
}
