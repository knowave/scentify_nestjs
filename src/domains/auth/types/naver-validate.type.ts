import { KakaoValidateType } from './kakao-validate.type';

export type NaverValidateType = Omit<KakaoValidateType, 'kakaoId'> & {
    naverId?: string;
};
