import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(email: string): Promise<User> {
    let user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      user = this.userRepository.create({ email, username: email });
      await this.userRepository.save(user);
    }

    return user;
  }
}
