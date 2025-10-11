import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignInDto {
  @Field(() => String, { name: 'email' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @Field(() => String, { name: 'password' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be less than 20 characters long' })
  password: string;
}
