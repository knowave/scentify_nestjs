import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { NaverValidateDto } from '../dto/naver-validate.dto';
import {
  NAVER_CALLBACK_URL,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
} from 'src/common/env';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientId: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
      callbackURL: NAVER_CALLBACK_URL,
    });
  }

  async validate(naverValidateDto: NaverValidateDto) {
    const { accessToken, refreshToken, profile } = naverValidateDto;
    const { id, email, nickname } = profile;

    return {
      id,
      email,
      nickname,
      accessToken,
      refreshToken,
    };
  }
}
