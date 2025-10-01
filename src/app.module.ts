import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/users/user.module';
import { PostModule } from './modules/posts/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQlModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
