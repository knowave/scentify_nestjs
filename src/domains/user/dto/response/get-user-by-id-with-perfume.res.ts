import { Expose, Type } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { Perfume } from 'src/domains/perfume/entities/perfume.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdWithPerfume extends User {
    @Expose()
    @Type(() => Perfume)
    @ApiProperty({ readOnly: true, type: [Perfume], description: '사용자가 선택한 향수 목록' })
    declare perfumes: Perfume[];
}
