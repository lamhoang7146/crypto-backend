import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { Post as PostPrisma } from '@prisma/client';
import { PostService } from './post.service';
import { CreatePostDto } from './dto';
import { CurrentUser, CurrentUserResponse } from '@/common';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post], { name: 'posts', description: 'Retrieve all posts' })
  async findAll(): Promise<PostPrisma[]> {
    return await this.postService.findAll();
  }

  @Mutation(() => Boolean, { name: 'createPost', description: 'Create post' })
  async createPost(
    @Args('input') input: CreatePostDto,
    @CurrentUser() user: CurrentUserResponse,
  ) {
    return await this.postService.createPost(input, user);
  }
}
