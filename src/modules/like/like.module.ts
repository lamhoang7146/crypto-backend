import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaModule } from '@/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, LikeService, LikeResolver],
})
export class LikeModule {}
