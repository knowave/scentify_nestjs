import { Module } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { PerfumeController } from './perfume.controller';
import { Perfume } from './entities/perfume.entity';
import { PerfumeRepository } from './perfume.repository';
import { S3Module } from '../s3/s3.module';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MikroOrmModule.forFeature([Perfume]),
    S3Module,
    UserModule,
    ScheduleModule.forRoot(),
  ],
  providers: [PerfumeService, PerfumeRepository],
  controllers: [PerfumeController],
})
export class PerfumeModule {}
