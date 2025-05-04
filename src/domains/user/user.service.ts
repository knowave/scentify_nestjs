import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { EXIST_EMAIL } from './error/user.error';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class UserService {
    private readonly salt: number;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly s3Service: S3Service
    ) {
        this.salt = 10;
    }

    async getUserById(id: number) {
        return await this.userRepository.findOneById(id);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOneByEmailWithValidation(email);
    }

    async createUser(createUserDto: CreateUserDto, isAdmin?: boolean) {
        const { email, password, username, nickname, phoneNumber } = createUserDto;
        const existEmail = await this.userRepository.findOneByEmail(email);

        if (existEmail) throw new BadRequestException(EXIST_EMAIL);

        await this.userRepository.save(
            this.userRepository.create({
                email,
                password: await this.hashPassword(password),
                username,
                nickname,
                phoneNumber,
                role: isAdmin ? Role.ADMIN : Role.USER
            })
        );

        return;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        let profileImage: string;
        const { email, password, username, nickname, phoneNumber, image, introduction } = updateUserDto;

        const user = await this.userRepository.findOneById(userId);

        if (email) user.email = email;
        if (username) user.username = username;
        if (nickname) user.nickname = nickname;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (introduction) user.introduction = introduction;
        if (password) {
            user.password = await this.hashPassword(password);
        }

        if (image) {
            const { fileName, mimeType, fileContent } = image;
            const newFileName = `${uuid()}-${fileName}`;

            const uploadFile = await this.s3Service.uploadObject(newFileName, fileContent, mimeType);

            profileImage = uploadFile.Key;
            user.profileImage = profileImage;
        }

        await this.userRepository.upsert(user);
    }

    async deleteUser(userId: number) {
        const user = await this.userRepository.findOneById(userId);

        await this.userRepository.upsert({
            id: user.id,
            isDeleted: true,
            deletedAt: new Date()
        });
    }

    async restoreDeletedUser(userId: number) {
        const user = await this.userRepository.findOneByIdAndDeletedWithThirtyDays(userId);

        user.deletedAt = null;
        user.isDeleted = false;
        await this.userRepository.upsert(user);
    }

    async myProfile(userId: number) {
        return await this.userRepository.findOneByIdWithPerfume(userId);
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt);
    }
}
