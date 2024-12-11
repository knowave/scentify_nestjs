import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Perfume } from './entities/perfume.entity';
import { RecommendPerfumeDto } from './dto/recommend-perfume.dto';

@Injectable()
export class PerfumeRepository extends Repository<Perfume> {
  constructor(private readonly dataSource: DataSource) {
    super(Perfume, dataSource.createEntityManager());
  }

  async findManyByName(names: string[]): Promise<Perfume[]> {
    return await this.createQueryBuilder('perfume')
      .where('perfume.name IN (:...names)', { names })
      .getMany();
  }

  async findPerfumeRecommend(
    recommendPerfumeDto: RecommendPerfumeDto,
  ): Promise<Perfume[]> {
    const qb = this.createQueryBuilder('perfume');

    switch (recommendPerfumeDto) {
      case recommendPerfumeDto.mood:
        qb.andWhere('perfume.mood = :mood', { mood: recommendPerfumeDto.mood });
        break;
      case recommendPerfumeDto.intensity:
        qb.andWhere('perfume.intensity = :intensity', {
          intensity: recommendPerfumeDto.intensity,
        });
        break;
      case recommendPerfumeDto.longevity:
        qb.andWhere('perfume.longevity = :longevity', {
          longevity: recommendPerfumeDto.longevity,
        });
        break;
      case recommendPerfumeDto.season:
        qb.andWhere('perfume.season IN (:...season)', {
          season: `%${recommendPerfumeDto.season}%`,
        });
        break;
      case recommendPerfumeDto.scents:
        qb.andWhere('perfume.scents IN (:...scents)', {
          scents: `%${recommendPerfumeDto.scents}%`,
        });
        break;
      case recommendPerfumeDto.priceRange:
        qb.andWhere('perfume.price BETWEEN :min AND :max', {
          min: recommendPerfumeDto.priceRange.min,
          max: recommendPerfumeDto.priceRange.max,
        });
        break;
      case recommendPerfumeDto.brand:
        qb.andWhere('perfume.brand = :brand', {
          brand: recommendPerfumeDto.brand,
        });
        break;
      case recommendPerfumeDto.gender:
        qb.andWhere('perfume.gender = :gender', {
          gender: recommendPerfumeDto.gender,
        });
        break;
    }

    return await qb.getMany();
  }
}
