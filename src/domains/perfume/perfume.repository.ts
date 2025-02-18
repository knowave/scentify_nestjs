import { Injectable } from '@nestjs/common';
import { Perfume } from './entities/perfume.entity';
import { RecommendPerfumeDto } from './dto/recommend-perfume.dto';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class PerfumeRepository extends EntityRepository<Perfume> {
  constructor(protected readonly em: EntityManager) {
    super(em, Perfume);
  }

  findManyByName(names: string[]): Promise<Perfume[]> {
    return this.find({ name: { $in: names } });
  }

  findPerfumeRecommend(
    recommendPerfumeDto: RecommendPerfumeDto,
  ): Promise<Perfume> {
    const qb = this.em.createQueryBuilder(Perfume, 'perfume');

    switch (recommendPerfumeDto) {
      case recommendPerfumeDto.mood:
        qb.andWhere({ mood: recommendPerfumeDto.mood });
        break;
      case recommendPerfumeDto.intensity:
        qb.andWhere({ intensity: recommendPerfumeDto.intensity });
        break;
      case recommendPerfumeDto.longevity:
        qb.andWhere({ longevity: recommendPerfumeDto.longevity });
        break;
      case recommendPerfumeDto.season:
        qb.andWhere({ season: { $in: recommendPerfumeDto.season } });
        break;
      case recommendPerfumeDto.scents:
        qb.andWhere({ scents: { $in: recommendPerfumeDto.scents } });
        break;
      case recommendPerfumeDto.priceRange:
        qb.andWhere({ price: { $between: recommendPerfumeDto.priceRange } });
        break;
      case recommendPerfumeDto.brand:
        qb.andWhere({ brand: recommendPerfumeDto.brand });
        break;
      case recommendPerfumeDto.gender:
        qb.andWhere({ gender: recommendPerfumeDto.gender });
        break;
    }

    return qb.getSingleResult();
  }
}
