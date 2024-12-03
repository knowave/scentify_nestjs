import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, comment: '사용자 이메일' })
  email: string;

  @Column({ type: 'varchar', comment: '사용자 이름' })
  username: string;

  @Column({ type: 'varchar', comment: '사용자 닉네임' })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 128,
    comment: '사용자 비밀번호',
    select: false,
  })
  password: string;

  @Column({ type: 'varchar', comment: '사용자 전화번호' })
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

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: '사용자 토큰',
    select: false,
  })
  token: string;

  @Column({ type: 'boolean', nullable: true, comment: '탈퇴여부' })
  isDeleted: boolean;
}