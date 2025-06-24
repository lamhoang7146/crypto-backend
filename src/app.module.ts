import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQlModule } from './modules/graphql/graphql.module';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQlModule,
    TodoModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
