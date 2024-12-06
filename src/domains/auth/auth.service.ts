import { BadRequestException, Injectable } from '@nestjs/common';
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
import * as bcrypt from 'bcrypt';
import { INVALID_AUTH_ERROR } from './error/auth.error';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByEmailWithValidation(email);

    await this.verifyPassword(password, user.password);

    delete user.password;
    return user;
  }

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

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneByEmailWithValidation(email);
    await this.validateUser(email, password);

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    user.token = refreshToken;
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }

  async logout(user: User): Promise<void> {
    user.token = null;
    await this.userRepository.save(user);
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

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatch) throw new BadRequestException(INVALID_AUTH_ERROR);
  }
}
