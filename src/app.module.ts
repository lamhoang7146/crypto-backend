import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQlModule,
    UserModule,
    PrismaModule
  ],
})
export class AppModule { }
