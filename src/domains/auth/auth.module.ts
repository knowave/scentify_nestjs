import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_ACCESS_TOKEN_EXPIRATION_TIME, JWT_ACCESS_TOKEN_SECRET } from 'src/common/config/env';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JWT_ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME }
        })
    ],
    providers: [AuthService],
    controllers: [],
    exports: []
})
export class AuthModule {}
