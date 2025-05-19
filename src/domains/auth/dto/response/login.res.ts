import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResDto {
    @Expose()
    @ApiProperty({ readOnly: true, description: 'access token' })
    accessToken: string;

    @Expose()
    @ApiProperty({ readOnly: true, description: 'refresh token' })
    refreshToken: string;
}
