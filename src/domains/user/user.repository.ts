import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { NOT_FOUND_DELETED_USER, NOT_FOUND_USER } from './error/user.error';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
@Injectable()
export class UserRepository extends EntityRepository<User> {
    constructor(protected readonly em: EntityManager) {
        super(em, User);
    }

    findOneById(id: number) {
        const user = this.findOne({ id });

        if (!user) throw new NotFoundException(NOT_FOUND_USER);

        return user;
    }

    findOneByEmailWithValidation(email: string) {
        const user = this.findOne({ email }, { fields: ['*', 'password'] });

        if (!user) throw new NotFoundException(NOT_FOUND_USER);

        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.findOne({ email });

        return user;
    }

    findOneByIdAndDeletedWithThirtyDays(userId: number) {
        const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const deletedUser = this.findOne(
            {
                id: userId,
                deletedAt: { $gte: date },
                isDeleted: true
            },
            { filters: false }
        );

        if (!deletedUser) throw new NotFoundException(NOT_FOUND_DELETED_USER);

        return deletedUser;
    }

    findOneByIdWithPerfume(id: number) {
        const user = this.findOne({ id }, { fields: ['*', 'perfumes'] });

        return user;
    }

    async save(user: User) {
        return await this.em.persistAndFlush(user);
    }
}
