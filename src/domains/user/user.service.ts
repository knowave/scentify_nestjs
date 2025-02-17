import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
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
    private readonly s3Service: S3Service,
  ) {
    this.salt = 10;
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmailWithValidation(email);
  }

  async createUser(
    createUserDto: CreateUserDto,
    isAdmin?: boolean,
  ): Promise<void> {
    const { email, password, username, nickname, phoneNumber } = createUserDto;
    const existEmail = await this.userRepository.findOneByEmail(email);

    // 더블 체크
    if (existEmail) throw new BadRequestException(EXIST_EMAIL);

    await this.userRepository.save(
      this.userRepository.create({
        email,
        password: await this.hashPassword(password),
        username,
        nickname,
        phoneNumber,
        role: isAdmin ? Role.ADMIN : Role.USER,
      }),
    );
    return;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    let profileImage: string;
    const {
      email,
      password,
      username,
      nickname,
      phoneNumber,
      image,
      introduction,
    } = updateUserDto;

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

      const uploadFile = await this.s3Service.uploadObject(
        newFileName,
        fileContent,
        mimeType,
      );

      profileImage = uploadFile.Key;
      user.profileImage = profileImage;
    }

    await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOneById(userId);

    await this.userRepository.softDelete({
      id: user.id,
      isDeleted: true,
    });
  }

  async restoreDeletedUser(userId: number): Promise<void> {
    const user =
      await this.userRepository.findOneByIdAndDeletedWithThirtyDays(userId);

    user.deletedAt = null;
    user.isDeleted = false;
    await this.userRepository.save(user);
  }

  async myProfile(userId: number): Promise<User> {
    return await this.userRepository.findOneByIdWithPerfume(userId);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }
}
