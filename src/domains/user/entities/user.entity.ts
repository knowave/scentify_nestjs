import { Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/base.entity';
import { Perfume } from 'src/domains/perfume/entities/perfume.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
    @ApiProperty({ readOnly: true, description: '사용자 이메일' })
    @Expose()
    @Property({ type: 'varchar', unique: true, comment: '사용자 이메일' })
    email: string;

    @ApiProperty({ readOnly: true, description: '사용자 이름' })
    @Expose()
    @Property({ type: 'varchar', comment: '사용자 이름' })
    username: string;

    @ApiProperty({ readOnly: true, description: '사용자 닉네임' })
    @Expose()
    @Property({ type: 'varchar', nullable: true, comment: '사용자 닉네임' })
    nickname: string;

    @ApiProperty({ readOnly: true, description: '소셜 로그인 사용자 ID (ex: naver_12345, kakao_67890)' })
    @Expose()
    @Property({
        type: 'varchar',
        unique: true,
        nullable: true,
        comment: '소셜 로그인 사용자 ID (ex: naver_12345, kakao_67890)'
    })
    socialId: string;

    @ApiProperty({ readOnly: true, description: '소셜 로그인 타입 (NAVER, KAKAO, GOOGLE)' })
    @Expose()
    @Property({ nullable: true, comment: '소셜 로그인 타입 (NAVER, KAKAO, GOOGLE)' })
    socialLoginType: string;

    @ApiProperty({ readOnly: true, description: '사용자 비밀번호' })
    @Expose()
    @Property({
        type: 'varchar',
        length: 128,
        comment: '사용자 비밀번호',
        nullable: true,
        hidden: false
    })
    password: string;

    @ApiProperty({ readOnly: true, description: '사용자 전화번호' })
    @Expose()
    @Property({ type: 'varchar', nullable: true, comment: '사용자 전화번호' })
    phoneNumber: string;

    @ApiProperty({ readOnly: true, description: '프로필 이미지' })
    @Expose()
    @Property({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '프로필 이미지'
    })
    profileImage: string;

    @ApiProperty({ readOnly: true, description: '사용자 소개글' })
    @Expose()
    @Property({
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: '사용자 소개글'
    })
    introduction: string;

    @ApiProperty({ readOnly: true, description: '사용자 역할' })
    @Expose()
    @Property({ type: 'varchar', comment: '사용자 역할' })
    role: string;

    @ApiProperty({ readOnly: true, description: '사용자 토큰' })
    @Expose()
    @Property({
        type: 'varchar',
        length: 512,
        nullable: true,
        comment: '사용자 토큰',
        hidden: true
    })
    token: string;

    @ApiProperty({ readOnly: true, description: '탈퇴여부' })
    @Expose()
    @Property({ type: 'boolean', default: false, comment: '탈퇴여부' })
    isDeleted: boolean;

    @OneToMany(() => Perfume, perfume => perfume.user)
    perfumes: Perfume[];
}
