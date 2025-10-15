import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtPayload {
  @Field()
  name: string;
}
