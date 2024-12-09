import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NOT_FOUND_USER } from './error/user.error';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException(NOT_FOUND_USER);

    return user;
  }

  async findOneByEmailWithValidation(email: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) throw new NotFoundException(NOT_FOUND_USER);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }
}
