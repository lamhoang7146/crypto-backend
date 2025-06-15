import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(()=> String,{ description: 'The title of the todo item' })
  title: string;
}
