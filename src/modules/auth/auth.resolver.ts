import { Args, Mutation, Resolver, Context, Query } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  JwtPayload,
  NewPasswordDto,
  SignInDto,
  UserModel,
} from './dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { CurrentUser, CurrentUserResponse } from '@/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => JwtPayload, { name: 'signIn', description: 'Sign in a user' })
  async signIn(
    @Args('signInDto') signInDto: SignInDto,
    @Context() context: { req: Request; res: Response },
  ) {
    const user = await this.authService.validateUser(signInDto);
    const { accessToken } = await this.authService.generateToken(user.id);

    context.res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return {
      name: user.name,
    };
  }

  @Mutation(() => Boolean, { name: 'signOut', description: 'Sign out a user' })
  signOut(@Context() context: { req: Request; res: Response }) {
    context.res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return true;
  }

  @Query(() => UserModel, { name: 'me', description: 'Get current user info' })
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: CurrentUserResponse) {
    return await this.authService.getUserById(user.id);
  }

  @Mutation(() => String, {
    name: 'forgotPassword',
    description: 'Forgot password',
  })
  async forgotPassword(
    @Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
  ) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Mutation(() => String, {
    name: 'resetPassword',
    description: 'Reset password',
  })
  async resetPassword(@Args('newPasswordDto') newPasswordDto: NewPasswordDto) {
    return await this.authService.resetPassword(newPasswordDto);
  }
}
