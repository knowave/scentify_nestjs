import { Cascade, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/base.entity';
import { Role } from 'src/common/enums/role.enum';
import { SocialLoginType } from 'src/domains/auth/enums/social-login-type.enum';
import { Perfume } from 'src/domains/perfume/entities/perfume.entity';

@Entity()
export class User extends BaseEntity {
    @Property({ type: 'varchar', unique: true, comment: '사용자 이메일' })
    email: string;

    @Property({ type: 'varchar', comment: '사용자 이름' })
    username: string;

    @Property({ type: 'varchar', nullable: true, comment: '사용자 닉네임' })
    nickname: string;

    @Property({
        type: 'varchar',
        unique: true,
        nullable: true,
        comment: '소셜 로그인 사용자 ID (ex: naver_12345, kakao_67890)'
    })
    socialId: string;

    @Enum({
        items: () => SocialLoginType,
        nullable: true,
        comment: '소셜 로그인 타입 (NAVER, KAKAO, GOOGLE)'
    })
    socialLoginType: SocialLoginType;

    @Property({
        type: 'varchar',
        length: 128,
        comment: '사용자 비밀번호',
        nullable: true,
        hidden: false
    })
    password: string;

    @Property({ type: 'varchar', nullable: true, comment: '사용자 전화번호' })
    phoneNumber: string;

    @Property({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '프로필 이미지'
    })
    profileImage: string;

    @Property({
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: '사용자 소개글'
    })
    introduction: string;

    @Enum({ items: () => Role, default: Role.USER })
    role: Role;

    @Property({
        type: 'varchar',
        length: 512,
        nullable: true,
        comment: '사용자 토큰',
        hidden: true
    })
    token: string;

    @Property({ type: 'boolean', default: false, comment: '탈퇴여부' })
    isDeleted: boolean;

    @OneToMany(() => Perfume, perfume => perfume.user, {
        cascade: [Cascade.REMOVE]
    })
    perfumes: Perfume[];
}
