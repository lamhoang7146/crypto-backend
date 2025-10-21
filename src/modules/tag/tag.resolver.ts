import { Query, Resolver } from '@nestjs/graphql';
import { Tag } from './entities/tag.entity';
import { Tag as PrismaTag } from '@prisma/client';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => [Tag], { name: 'tags' })
  async findAll(): Promise<PrismaTag[]> {
    return await this.tagService.findAll();
  }

  @Query(() => String, { name: 'testing', description: 'testing' })
  testing() {
    return 'OK!';
  }
}
