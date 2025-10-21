import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post as PrismaPost } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaPost[]> {
    return await this.prisma.post.findMany();
  }
}
