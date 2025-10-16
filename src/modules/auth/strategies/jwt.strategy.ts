import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtSubType } from '../types';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestWithCookies } from '@/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies): string | null => {
          if (!req || !req.cookies || !req.cookies.access_token) {
            return null;
          }
          return req.cookies.access_token;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtSubType) {
    const user = await this.authService.validateJwtUser(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid token');
    return user;
  }
}
