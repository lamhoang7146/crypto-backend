import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment as PrismaComment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaComment[]> {
    return await this.prisma.comment.findMany();
  }
}
