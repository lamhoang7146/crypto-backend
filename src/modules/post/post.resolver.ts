import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { Post as PostPrisma } from '@prisma/client';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  async findAll(): Promise<PostPrisma[]> {
    return await this.postService.findAll();
  }
}
