import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreatePerfumeDto } from './dto/create-perfume.dto';

@Controller('perfume')
export class PerfumeController {
  constructor(private readonly perfumeService: PerfumeService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Post('')
  async createPerfume(@Body() createPerfumesDto: CreatePerfumeDto[]) {
    return await this.perfumeService.createPerfumes(createPerfumesDto);
  }
}
