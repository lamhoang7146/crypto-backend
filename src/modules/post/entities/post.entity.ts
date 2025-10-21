import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { Like } from '@/modules/like/entities/like.entity';
import { User } from '@/modules/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Like])
  likes: Like[];

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
