import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { NaverValidateDto } from '../dto/naver-validate.dto';
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
      clientId: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
      callbackURL: NAVER_CALLBACK_URL,
    });
  }

  async validate(naverValidateDto: NaverValidateDto) {
    const { accessToken, refreshToken, profile } = naverValidateDto;
    const { email, nickname } = profile;

    const user = await this.authService.validateUser(email, nickname);

    // 액세스 토큰과 리프레시 토큰을 저장하거나 반환
    user['accessToken'] = accessToken;
    user['refreshToken'] = refreshToken;

    return user;
  }
}
