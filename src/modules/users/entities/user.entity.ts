import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
