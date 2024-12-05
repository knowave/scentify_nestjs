import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { Perfume } from './entities/perfume.entity';
import { PerfumeRepository } from './perfume.repository';
import { EXIST_PERFUME } from './error/perfume.error';

@Injectable()
export class PerfumeService {
  constructor(private readonly perfumeRepository: PerfumeRepository) {}

  async createPerfumes(createPerfumesDto: CreatePerfumeDto[]): Promise<void> {
    const perfumes: Perfume[] = [];
    await this.validatePerfume(createPerfumesDto.map((dto) => dto.name));

    for (const {
      name,
      brand,
      description,
      price,
      intensity,
      mood,
      longevity,
      gender,
      season,
      scents,
      imageUrl,
    } of createPerfumesDto) {
      const createPerfume = this.perfumeRepository.create({
        name,
        brand,
        description,
        price,
        intensity,
        mood,
        longevity,
        gender,
        season,
        scents,
        imageUrl,
      });

      perfumes.push(createPerfume);
    }

    await this.perfumeRepository.save(perfumes);
  }

  private async validatePerfume(names: string[]) {
    const perfumes = await this.perfumeRepository.findManyByName(names);

    if (perfumes && perfumes.length > 0) {
      const existNames = perfumes.map((perfume) => perfume.name);

      throw new BadRequestException(EXIST_PERFUME(existNames.join(', ')));
    }

    return null;
  }
}
