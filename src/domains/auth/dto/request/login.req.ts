import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: '이메일' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: '비밀번호' })
    password: string;
}
