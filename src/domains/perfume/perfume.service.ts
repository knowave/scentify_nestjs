import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { Perfume } from './entities/perfume.entity';
import { PerfumeRepository } from './perfume.repository';
import { EXIST_PERFUME } from './error/perfume.error';
import { S3Service } from '../s3/s3.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PerfumeService {
  constructor(
    private readonly perfumeRepository: PerfumeRepository,
    private readonly s3Service: S3Service,
  ) {}

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
      image,
    } of createPerfumesDto) {
      let imageUrl: string;

      if (image) {
        const { fileName, mimeType, fileContent } = image;
        const newFileName = `${uuid()}-${fileName}`;

        const uploadFile = await this.s3Service.uploadObject(
          newFileName,
          fileContent,
          mimeType,
        );

        imageUrl = uploadFile.Key;
      }

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
        imageUrl: imageUrl || null,
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
