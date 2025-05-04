import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { RecommendPerfumeDto } from './dto/recommend-perfume.dto';
import { Perfume } from './entities/perfume.entity';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('perfume')
export class PerfumeController {
    constructor(private readonly perfumeService: PerfumeService) {}

    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @UseInterceptors(FilesInterceptor('image'))
    @Post('')
    async createPerfume(@UploadedFiles() files: Express.Multer.File[], @Body() createPerfumesDto: CreatePerfumeDto[]) {
        createPerfumesDto.forEach((dto, idx) => {
            const file = files[idx];
            return (dto.image = {
                fileName: file.filename,
                mimeType: file.mimetype,
                fileContent: file.buffer
            });
        });

        return await this.perfumeService.createPerfumes(createPerfumesDto);
    }

    @Post('recommend/perfume')
    async recommendPerfume(
        @CurrentUser() user: User,
        @Body() recommendPerfumeDto: RecommendPerfumeDto
    ): Promise<Perfume> {
        return await this.perfumeService.recommendPerfume(user, recommendPerfumeDto);
    }
}
