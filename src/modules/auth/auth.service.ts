import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { SignInDto } from './dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtSubType } from './types';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    const passwordMatch = await verify(user.password!, password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials!');

    return user;
  }

  async generateToken(userId: string) {
    const payload: JwtSubType = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async signIn(user: User) {
    const { accessToken } = await this.generateToken(user.id);

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    return {
      id: user.id,
    };
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
