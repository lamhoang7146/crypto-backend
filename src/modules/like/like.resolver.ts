import { Query, Resolver } from '@nestjs/graphql';
import { Like } from './entities/like.entity';
import { Like as PrismaLike } from '@prisma/client';
import { LikeService } from './like.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private LikeService: LikeService) {}

  @Query(() => [Like], { name: 'likes' })
  async findAll(): Promise<PrismaLike[]> {
    return await this.LikeService.findAll();
  }
}
