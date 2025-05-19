import { User } from 'src/domains/user/entities/user.entity';

export type KakaoValidateType = {
    type: string;
    kakaoId?: string;
    email?: string;
    user?: User;
};
