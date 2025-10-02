import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tag as PrismaTag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaTag[]> {
    return this.prisma.tag.findMany();
  }
}
