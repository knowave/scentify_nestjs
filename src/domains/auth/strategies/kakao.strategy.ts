import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';
import { KAKAO_CALLBACK_URL, KAKAO_CLIENT_ID } from 'src/common/env';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: KAKAO_CLIENT_ID,
            callbackURL: KAKAO_CALLBACK_URL
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const kakaoId = String(profile.id);
        const email = profile._json.kakao_account.email;

        console.log(`kakao login strategy result: ${profile}`);

        const user = await this.authService.validateKakao(kakaoId);

        if (!user) return { kakaoId, email, type: 'kakao' };

        return { user, type: 'kakao' };
    }
}
