import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verify, hash } from 'argon2';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ForgotPasswordDto, NewPasswordDto, SignInDto } from './dto';
import { EmailService } from '@/modules/email/email.service';
import { JwtSubType } from './types';

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

  async resetPassword({ password, confirmPassword, token }: NewPasswordDto) {
    if (password !== confirmPassword)
      throw new UnauthorizedException('Password does not match');

    const payload: JwtSubType = await this.jwtService.verifyAsync(token, {
      ignoreExpiration: false,
    });

    if (!payload) throw new UnauthorizedException('Invalid token');

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) throw new UnauthorizedException('User not found');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: await hash(password) },
    });

    return 'Reset password successfully';
  }
}
