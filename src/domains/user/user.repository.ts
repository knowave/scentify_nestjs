import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SaveUserType } from './types/save.type';
import { SocialLoginEnum } from 'src/common/enum/social-login.enum';

@Injectable()
export class UserRepository extends EntityRepository<User> {
    constructor(protected readonly em: EntityManager) {
        super(em, User);
    }

    findUserById(id: number) {
        return this.findOne({ id });
    }

    findUserByEmail(email: string) {
        return this.findOne({ email });
    }

    async save(user: SaveUserType) {
        const createUser = this.create(user);
        return await this.em.persistAndFlush(createUser);
    }

    async update(user: User) {
        return await this.em.persistAndFlush(user);
    }

    async softDelete(user: User) {
        user.isDeleted = true;
        return await this.em.persistAndFlush(user);
    }

    findUserByIdWithPerfume(id: number) {
        return this.createQueryBuilder('user')
            .leftJoinAndSelect('user.perfumes', 'perfumes')
            .where('user.id = ?', [id])
            .execute('get');
    }

    findUserByIdAndThirtyDays(id: number) {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        return this.findOne({ id, deletedAt: { $gt: thirtyDaysAgo }, isDeleted: true }, { filters: false });
    }

    findUserByIdWithDeletedUser(id: number) {
        return this.findOne({ id }, { filters: false });
    }

    findUserByKakaoIdWithDeletedUser(kakaoId: string) {
        return this.findOne({ socialId: kakaoId, socialLoginType: SocialLoginEnum.KAKAO }, { filters: false });
    }

    findUserByEmailWithPassword(email: string) {
        return this.findOne({ email }, { fields: ['*', 'password'] });
    }
}
