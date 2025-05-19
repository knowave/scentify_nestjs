import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CustomException } from 'src/utils/custom-excaption';
import { BAD_REQUEST } from 'src/common/error/bad-request.error';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

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

    private async verifyPassword({ password, hashedPassword }: { password: string; hashedPassword: string }) {
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatch) throw new CustomException(BAD_REQUEST.INVALID_PASSWORD);
    }
}
