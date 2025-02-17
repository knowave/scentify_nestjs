import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
} from 'src/common/env';
import { JwtStrategy } from './strategies/jwt.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    NaverStrategy,
    LocalStrategy,
    KakaoStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
