import { BaseEntity } from 'src/common/base.entity';
import { Role } from 'src/common/enums/role.enum';
import { SocialLoginType } from 'src/domains/auth/enums/social-login-type.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, comment: '사용자 이메일' })
  email: string;

  @Column({ type: 'varchar', comment: '사용자 이름' })
  username: string;

  @Column({ type: 'varchar', nullable: true, comment: '사용자 닉네임' })
  nickname: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
    comment: '소셜 로그인 사용자 ID (ex: naver_12345, kakao_67890)',
  })
  socialId: string;

  @Column({
    type: 'enum',
    enum: SocialLoginType,
    nullable: true,
    comment: '소셜 로그인 타입 (NAVER, KAKAO, GOOGLE)',
  })
  socialLoginType: SocialLoginType;

  @Column({
    type: 'varchar',
    length: 128,
    comment: '사용자 비밀번호',
    nullable: true,
    select: false,
  })
  password: string;

  @Column({ type: 'varchar', nullable: true, comment: '사용자 전화번호' })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '프로필 이미지',
  })
  profileImage: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '사용자 소개글',
  })
  introduction: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    comment: '사용자 토큰',
    select: false,
  })
  token: string;

  @Column({ type: 'boolean', default: false, comment: '탈퇴여부' })
  isDeleted: boolean;

  @Column('integer', { nullable: true, comment: '향수 고유값' })
  perfumeId: number;
}
