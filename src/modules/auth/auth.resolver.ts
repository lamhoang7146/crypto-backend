import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtPayload, SignInDto } from './dtos';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => JwtPayload, { name: 'signIn' })
  async signIn(@Args('signInDto') signInDto: SignInDto) {
    return await this.authService.signIn(
      await this.authService.validateUser(signInDto),
    );
  }
}
