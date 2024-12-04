import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-naver';
import { JWT_ACCESS_TOKEN_SECRET } from 'src/common/env';
import { User } from 'src/domains/user/entities/user.entity';
import { UNAUTHORIZED_USER } from 'src/domains/user/error/error-code';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload;
    const user = this.userService.getUserById(id);

    if (!user) throw new UnauthorizedException(UNAUTHORIZED_USER);

    return user;
  }
}
