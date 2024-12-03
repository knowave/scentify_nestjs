import { Module } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { PerfumeController } from './perfume.controller';

@Module({
  providers: [PerfumeService],
  controllers: [PerfumeController]
})
export class PerfumeModule {}
