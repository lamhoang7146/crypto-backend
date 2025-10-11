import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtPayload, SignInDto } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => JwtPayload, { name: 'signIn', description: 'Sign in a user' })
  async signIn(@Args('signInDto') signInDto: SignInDto) {
    return await this.authService.signIn(
      await this.authService.validateUser(signInDto),
    );
  }
}
