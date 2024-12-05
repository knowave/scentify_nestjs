import { PartialType } from '@nestjs/mapped-types';
import { Perfume } from '../entities/perfume.entity';

export class CreatePerfumeDto extends PartialType(Perfume) {}
