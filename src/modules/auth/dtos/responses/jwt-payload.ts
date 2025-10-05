import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtPayload {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string | null;

  @Field()
  accessToken: string;
}
