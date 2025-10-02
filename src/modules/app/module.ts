import { GraphQlModule } from '@/modules/graphql/graphql.module';
import { UserModule } from '@/modules/user/user.module';
import { PostModule } from '@/modules/post/post.module';
import { TagModule } from '@/modules/tag/tag.module';
import { CommentModule } from '@/modules/comment/comment.module';
import { LikeModule } from '@/modules/like/like.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigCustomModule } from '@/modules/config/config.module';

export const AppModules = [
  ConfigCustomModule,
  GraphQlModule,
  UserModule,
  AuthModule,
  PostModule,
  TagModule,
  CommentModule,
  LikeModule,
];
