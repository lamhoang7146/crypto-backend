import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ForgotPasswordDto, SignInDto } from './dto';
import { verify } from 'argon2';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
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

  async generateToken(userId: string, expiresIn?: string | number) {
    const expireTime =
      expiresIn || this.configService.get<string>('JWT_EXPIRES_IN') || '1h';

    const accessToken = await this.jwtService.signAsync({ sub: userId }, {
      expiresIn: expireTime,
    } as unknown as JwtSignOptions);

    return { accessToken };
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

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const { accessToken } = await this.generateToken(user.id, '5m');

    const check = await this.emailService.sendForgotPasswordEmail(
      email,
      accessToken,
    );

    if (!check) throw new UnauthorizedException('Error sending email');

    return 'Check your email for reset password link';
  }

  // async resetPassword(token: string, newPassword: string) {
  //   // Token validation and password reset logic goes here
  //   return true;
  // }
}
