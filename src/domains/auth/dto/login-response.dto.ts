import { User } from 'src/domains/user/entities/user.entity';

export class LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    user?: User;
}
