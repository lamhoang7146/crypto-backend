import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Like as PrismaLike } from '@prisma/client';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaLike[]> {
    return await this.prisma.like.findMany();
  }
}
