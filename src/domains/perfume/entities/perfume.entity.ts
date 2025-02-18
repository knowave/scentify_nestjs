import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class Perfume extends BaseEntity {
  @Property({
    type: 'varchar',
    nullable: false,
    comment: '향수 이름',
  })
  name: string;

  @Property({
    type: 'varchar',
    nullable: false,
    comment: '향수를 제조한 브랜드 이름',
  })
  brand: string;

  @Property({
    type: 'text',
    nullable: true,
    comment: '향수에 대한 상세 설명',
  })
  description: string;

  @Property({
    type: 'float',
    nullable: false,
    comment: '향수 가격 (단위: 원)',
  })
  price: number;

  @Property({
    type: 'varchar',
    nullable: true,
    comment: '향수의 강도 (예: 강함, 중간, 약함)',
  })
  intensity: string;

  @Property({
    type: 'varchar',
    nullable: true,
    comment: '향수가 전달하는 분위기 (예: 우아한, 스포티한)',
  })
  mood: string;

  @Property({
    type: 'varchar',
    nullable: true,
    comment: '향수의 지속력 (예: 3시간, 6시간, 하루)',
  })
  longevity: string;

  @Property({
    type: 'varchar',
    nullable: true,
    comment: '대상 성별 (예: 남성, 여성, 유니섹스)',
  })
  gender: string;

  @Property({
    type: 'simple-array',
    nullable: true,
    comment: '향수가 적합한 계절 목록 (예: 봄, 여름)',
  })
  season: string[];

  @Property({
    type: 'simple-array',
    nullable: true,
    comment: '향수의 주요 향기 성분 목록 (예: 시트러스, 플로럴)',
  })
  scents: string[];

  @Property({
    type: 'varchar',
    nullable: true,
    comment: '향수 이미지의 URL 경로',
  })
  imageUrl: string;
}
