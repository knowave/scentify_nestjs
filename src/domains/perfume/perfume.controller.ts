import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RecommendPerfumeDto } from './dto/recommend-perfume.dto';
import { Perfume } from './entities/perfume.entity';

@Controller('perfume')
export class PerfumeController {
  constructor(private readonly perfumeService: PerfumeService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Post('')
  async createPerfume(@Body() createPerfumesDto: CreatePerfumeDto[]) {
    return await this.perfumeService.createPerfumes(createPerfumesDto);
  }

  @Public()
  @Post('recommend/perfume')
  async recommendPerfume(
    @Body() recommendPerfumeDto: RecommendPerfumeDto,
  ): Promise<Perfume[]> {
    return await this.perfumeService.recommendPerfume(recommendPerfumeDto);
  }
}
