import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmail(email);
  }
}
