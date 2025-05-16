import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserBody } from './create-user.req';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserBody extends PartialType(CreateUserBody) {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, description: 'profile image url' })
    profileImage?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, description: 'introduction' })
    introduction?: string;
}
