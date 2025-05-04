import { IsArray, IsOptional, IsString } from 'class-validator';
import { PriceRangeDto } from './price-range.dto';

export class RecommendPerfumeDto {
    @IsString()
    @IsOptional()
    mood?: string;

    @IsString()
    @IsOptional()
    intensity?: string;

    @IsString()
    @IsOptional()
    longevity?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    season?: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    scents?: string[];

    @IsOptional()
    priceRange?: PriceRangeDto;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsOptional()
    gender?: string;
}
