import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
} from 'src/common/env';
import { SocialLoginType } from './enums/social-login-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateNaver(naverId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        socialId: naverId,
        socialLoginType: SocialLoginType.NAVER,
      },
    });

    if (!user) return null;

    return user;
  }

  async validateKakao(kakaoId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        socialId: kakaoId,
        socialLoginType: SocialLoginType.KAKAO,
      },
    });

    if (!user) return null;

    return user;
  }

  async validateGoogle(googleId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        socialId: googleId,
        socialLoginType: SocialLoginType.GOOGLE,
      },
    });

    if (!user) return null;

    return user;
  }

  async login() {
    // const accessToken = this.createAccessToken(user);
    // const refreshToken = this.createRefreshToken(user);
    // return { accessToken, refreshToken };
  }

  private createAccessToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return this.jwtService.sign(payload, {
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  private createRefreshToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return this.jwtService.sign(payload, {
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }
}
