import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/requests/create-user.dto';
import { User as PrismaUser } from '@prisma/client';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<PrismaUser[]> {
    return await this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<PrismaUser> {
    return this.userService.createUser(createUserDto);
  }
}
