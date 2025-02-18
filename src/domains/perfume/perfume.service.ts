import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { Perfume } from './entities/perfume.entity';
import { PerfumeRepository } from './perfume.repository';
import { EXIST_PERFUME } from './error/perfume.error';
import { S3Service } from '../s3/s3.service';
import { v4 as uuid } from 'uuid';
import { RecommendPerfumeDto } from './dto/recommend-perfume.dto';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class PerfumeService {
  constructor(
    private readonly perfumeRepository: PerfumeRepository,
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
  ) {}

  async createPerfumes(createPerfumesDto: CreatePerfumeDto[]) {
    const perfumes: Perfume[] = [];
    const perfumeNames = createPerfumesDto.map((dto) => dto.name);
    await this.validatePerfume(perfumeNames);

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
        imageUrl: imageUrl
          ? imageUrl
          : 'https://example.com/images/ocean-breeze.jpg',
      });

      perfumes.push(createPerfume);
    }

    await this.perfumeRepository.bulkSave(perfumes);
  }

  async recommendPerfume(user: User, recommendPerfumeDto: RecommendPerfumeDto) {
    const recommendPerfume =
      await this.perfumeRepository.findPerfumeRecommend(recommendPerfumeDto);

    if (recommendPerfume) {
      user.perfumes.push(recommendPerfume);
      await this.userRepository.upsert(user);
    }

    return recommendPerfume;
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
