import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Perfume } from './entities/perfume.entity';

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
}
