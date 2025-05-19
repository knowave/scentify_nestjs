import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CustomException } from 'src/utils/custom-excaption';
import { BAD_REQUEST } from 'src/common/error/bad-request.error';
import { LoginBodyDto } from './dto/request/login.req';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
    JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    JWT_REFRESH_TOKEN_SECRET
} from 'src/common/config/env';
import { plainToInstance } from 'class-transformer';
import { LoginResDto } from './dto/response/login.res';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateKakao(kakaoId: string) {
        return await this.userService.getUserByKakaoId(kakaoId);
    }

    async validateUser({ email, password }: { email: string; password: string }) {
        const user = await this.userService.getUserByEmailWithPassword(email);
        await this.verifyPassword({ password, hashedPassword: user.password });

        return user;
    }

    async validateNaver(naverId: string) {
        return await this.userService.getUserByNaverId(naverId);
    }

    async login({ email, password }: LoginBodyDto) {
        const user = await this.validateUser({ email, password });

        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        user.token = refreshToken;
        await this.userService.updateUserForToken(user);

        return plainToInstance(LoginResDto, <LoginResDto>{ accessToken, refreshToken });
    }

    async logout(id: number) {
        const user = await this.userService.getUserById(id);
        user.token = null;
        await this.userService.updateUserForToken(user);
    }

    private async generateAccessToken(user: User) {
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload, {
            secret: JWT_ACCESS_TOKEN_SECRET,
            expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME
        });
    }

    private async generateRefreshToken(user: User) {
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload, {
            secret: JWT_REFRESH_TOKEN_SECRET,
            expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME
        });
    }

    private async verifyPassword({ password, hashedPassword }: { password: string; hashedPassword: string }) {
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatch) throw new CustomException(BAD_REQUEST.INVALID_PASSWORD);
    }
}
