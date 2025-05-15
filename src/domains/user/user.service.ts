import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserServiceInterface } from './user.interface';
import { CustomException } from 'src/utils/custom-excaption';
import { NOT_FOUND } from 'src/common/error/not-found.error';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BAD_REQUEST } from 'src/common/error/bad-request.error';
import { ROLE } from 'src/common/enum/role.enum';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(private readonly repository: UserRepository) {}

    async getUserById(id: number) {
        const user = await this.repository.findUserById(id);

        if (!user) throw new CustomException(NOT_FOUND.USER);

        return plainToInstance(User, <User>user);
    }

    async createUser({ email, password, username, nickname, phoneNumber }: CreateUserDto) {
        const existEmail = await this.repository.findUserByEmail(email);

        if (existEmail) throw new CustomException(BAD_REQUEST.EMAIL_ALREADY_EXIST);

        await this.repository.save({
            email,
            password,
            username,
            nickname,
            phoneNumber,
            role: ROLE.USER
        });
    }
}
