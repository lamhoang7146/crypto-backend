import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { CreateUserDto } from './dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaUser[]> {
    return await this.prisma.user.findMany({
      include: {
        comments: true,
        posts: true,
        likes: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<PrismaUser> {
    const { password, ...user } = createUserDto;
    const isUserExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (isUserExist) {
      throw new BadRequestException('Email already exists!');
    }

    return await this.prisma.user.create({
      data: {
        ...user,
        password: await hash(password),
      },
    });
  }
}
