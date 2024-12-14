import { Module } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { PerfumeController } from './perfume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';
import { PerfumeRepository } from './perfume.repository';
import { S3Module } from '../s3/s3.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume]), S3Module, UserModule],
  providers: [PerfumeService, PerfumeRepository],
  controllers: [PerfumeController],
})
export class PerfumeModule {}
