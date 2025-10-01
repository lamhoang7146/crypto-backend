import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/user.service';
import { CreateUserDto } from '@/modules/users/dto/requests/create-user.dto';
import { User as PrismaUser } from '@prisma/client';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'users' })
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
