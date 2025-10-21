import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, PostService, PostResolver],
})
export class PostModule {}
