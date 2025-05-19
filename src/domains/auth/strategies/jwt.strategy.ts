import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_TOKEN_SECRET } from 'src/common/config/env';
import { FORBIDDEN } from 'src/common/error/forbidden.error';
import { UserService } from 'src/domains/user/user.service';
import { CustomException } from 'src/utils/custom-excaption';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_ACCESS_TOKEN_SECRET
        });
    }

    async validate(payload: any) {
        const { id } = payload;
        const user = await this.userService.getUserByIdWithDeletedUser(id);

        if (!user) throw new CustomException(FORBIDDEN.UNAUTHORIZED);

        return user;
    }
}
