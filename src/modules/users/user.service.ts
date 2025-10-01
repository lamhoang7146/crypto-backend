import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CreateUserDto } from '@/modules/users/dto/requests/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException('Email already exists!');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
  }
}
