import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaModule } from '@/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, PostService, PostResolver],
})
export class PostModule {}
