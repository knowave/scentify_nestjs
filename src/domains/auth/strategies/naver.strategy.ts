import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import {
  NAVER_CALLBACK_URL,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
} from 'src/common/env';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
      callbackURL: NAVER_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const naverId = profile.id;
    const email = profile.emails && profile.emails[0]?.value;

    const user = await this.authService.validateNaver(naverId);

    if (user === null) return { naverId, email, type: 'naver' };

    return { user, type: 'naver' };
  }
}
