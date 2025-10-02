import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, AuthResolver, PrismaService],
})
export class AuthModule {}
