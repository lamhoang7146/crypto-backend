import { Module } from '@nestjs/common';
import {
  AuthModule,
  CommentModule,
  ConfigCustomModule,
  GraphQlModule,
  LikeModule,
  PostModule,
  TagModule,
  UserModule,
} from '@/modules/app/module';

@Module({
  imports: [
    ConfigCustomModule,
    GraphQlModule,
    UserModule,
    AuthModule,
    PostModule,
    TagModule,
    CommentModule,
    LikeModule,
  ],
})
export class AppModule {}
