import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserServiceInterface } from './user.interface';
import { CustomException } from 'src/utils/custom-excaption';
import { NOT_FOUND } from 'src/common/error/not-found.error';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserBody } from './dto/request/create-user.req';
import { BAD_REQUEST } from 'src/common/error/bad-request.error';
import { ROLE } from 'src/common/enum/role.enum';
import { UpdateUserBody } from './dto/request/update-user.req';
import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from 'src/common/config/env';
import { GetUserByIdWithPerfume } from './dto/response/get-user-by-id-with-perfume.res';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(private readonly repository: UserRepository) {}

    async getUserById(id: number) {
        const user = await this.repository.findUserById(id);

        if (!user) throw new CustomException(NOT_FOUND.USER);

        return plainToInstance(User, <User>user);
    }

    async createUser({ email, password, username, nickname, phoneNumber }: CreateUserBody) {
        const existEmail = await this.repository.findUserByEmail(email);

        if (existEmail) throw new CustomException(BAD_REQUEST.EMAIL_ALREADY_EXIST);

        await this.repository.save({ email, password, username, nickname, phoneNumber, role: ROLE.USER });
    }

    async updateUser({
        id,
        updateUserDto: { email, password, username, nickname, phoneNumber, profileImage, introduction }
    }: {
        id: number;
        updateUserDto: UpdateUserBody;
    }): Promise<void> {
        const user = await this.getUserById(id);

        if (email) user.email = email;
        if (password) user.password = await this.hashPassword(password);
        if (username) user.username = username;
        if (nickname) user.nickname = nickname;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (profileImage) user.profileImage = profileImage;
        if (introduction) user.introduction = introduction;

        await this.repository.update(user);
    }

    async deleteUser(id: number) {
        const user = await this.getUserById(id);
        await this.repository.softDelete(user);
    }

    async getUserByIdWithPerfume(id: number) {
        const user = await this.repository.findUserByIdWithPerfume(id);

        if (!user) throw new CustomException(NOT_FOUND.USER);

        return plainToInstance(GetUserByIdWithPerfume, <GetUserByIdWithPerfume>user);
    }

    async restoreUser(id: number) {
        const user = await this.repository.findUserByIdAndThirtyDays(id);

        if (!user) throw new CustomException(NOT_FOUND.USER);

        user.isDeleted = false;
        user.deletedAt = null;

        await this.repository.update(user);
    }

    async getUserByIdWithDeletedUser(id: number) {
        const user = await this.repository.findUserByIdWithDeletedUser(id);

        if (!user) throw new CustomException(NOT_FOUND.USER);

        return plainToInstance(User, <User>user);
    }

    async getUserByKakaoId(kakaoId: string) {
        const user = await this.repository.findUserByKakaoIdWithDeletedUser(kakaoId);

        if (!user) return null;

        return plainToInstance(User, <User>user);
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }
}
