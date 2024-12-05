import { Module } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { PerfumeController } from './perfume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';
import { PerfumeRepository } from './perfume.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume])],
  providers: [PerfumeService, PerfumeRepository],
  controllers: [PerfumeController],
})
export class PerfumeModule {}
