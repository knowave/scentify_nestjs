import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/domains/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(email, password);

        if (!user) throw new UnauthorizedException();

        return user as User;
    }
}
