import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field({ name: 'content', description: 'Content of the post' })
  @MinLength(2, { message: 'Password must be at least 2 characters long' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field({
    name: 'thumbnail',
    description: 'Thumbnail of the post',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;
}
