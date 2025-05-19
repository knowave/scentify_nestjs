import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthService } from '../auth.service';
import { NAVER_CALLBACK_URL, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from 'src/common/config/env';
import { NaverValidateType } from '../types/naver-validate.type';

@Injectable()
export class NaverSTrategy extends PassportStrategy(Strategy, 'naver') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: NAVER_CLIENT_ID,
            clientSecret: NAVER_CLIENT_SECRET,
            callbackURL: NAVER_CALLBACK_URL
        });
    }

    async validate(profile: any): Promise<NaverValidateType> {
        const naverId = profile.id;
        const email = profile.email && profile.emails[0]?.value;

        const user = await this.authService.validateNaver(naverId);

        if (!user) return { type: 'naver', naverId, email };

        return { type: 'naver', user };
    }
}
