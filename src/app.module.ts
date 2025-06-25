import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQlModule } from './modules/graphql/graphql.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQlModule,
    UserModule
  ],
  providers: [PrismaService],
})
export class AppModule { }
