import { GraphQlModule } from '@/modules/graphql/graphql.module';
import { UserModule } from '@/modules/user/user.module';
import { PostModule } from '@/modules/post/post.module';
import { TagModule } from '@/modules/tag/tag.module';
import { CommentModule } from '@/modules/comment/comment.module';
import { LikeModule } from '@/modules/like/like.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigCustomModule } from '@/modules/config/config.module';
import { EmailModule } from '@/modules/email/email.module';

export const modules = [
  ConfigCustomModule,
  GraphQlModule,
  EmailModule,
  UserModule,
  AuthModule,
  PostModule,
  TagModule,
  CommentModule,
  LikeModule,
];
