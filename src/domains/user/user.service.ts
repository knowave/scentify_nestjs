import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EXIST_EMAIL } from './error/user.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmailWithValidation(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, password, username, nickname, phoneNumber } = createUserDto;
    const existEmail = await this.userRepository.findOneByEmail(email);

    // 더블 체크
    if (existEmail) throw new BadRequestException(EXIST_EMAIL);

    await this.userRepository.save(
      this.userRepository.create({
        email,
        password,
        username,
        nickname,
        phoneNumber,
      }),
    );
    return;
  }
}
