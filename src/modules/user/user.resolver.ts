import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { User as PrismaUser } from '@prisma/client';
import { CreateUserDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User], {
    name: 'users',
    description: 'Retrieve a list of all users',
  })
  async findAll(): Promise<PrismaUser[]> {
    return await this.userService.findAll();
  }

  @Mutation(() => User, {
    name: 'createUser',
    description: 'Create a new user',
  })
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<PrismaUser> {
    return await this.userService.createUser(createUserDto);
  }
}
