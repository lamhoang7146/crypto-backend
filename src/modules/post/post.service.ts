import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Post as PrismaPost } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { MinioService } from '@/modules/minio/minio.service';
import { CreatePostDto } from './dto';
import { CurrentUserResponse } from '@/common';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async findAll(): Promise<PrismaPost[]> {
    return await this.prisma.post.findMany();
  }

  async createPost(
    { content, thumbnail }: CreatePostDto,
    user: CurrentUserResponse,
  ) {
    if (!user?.id) throw new UnauthorizedException('User not found!');

    let thumbnailUrl: string | null = null;
    if (thumbnail) {
      const buffer = Buffer.from(thumbnail, 'base64');
      const objectName = `post/${Date.now()}.png`;

      thumbnailUrl = await this.minioService.upload(
        'posts',
        objectName,
        buffer,
        'image/png',
      );
    }

    return await this.prisma.post.create({
      data: {
        content: content,
        thumbnail: thumbnailUrl,
        published: true,
        userId: user.id,
      },
    });
  }
}
