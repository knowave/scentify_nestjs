import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { NaverGuard } from './guards/naver.guard';
import { KakaoGuard } from './guards/kakao.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return await this.authService.login(loginDto);
    }

    @Public()
    @Post('logout')
    async logout(@CurrentUser() user: User): Promise<void> {
        return await this.authService.logout(user);
    }

    @Public()
    @UseGuards(NaverGuard)
    @Get('naver')
    async naverLogin() {
        return;
    }

    @Public()
    @UseGuards(NaverGuard)
    @Get('/naver/callback')
    async naverCallback(@CurrentUser() user: any): Promise<LoginResponseDto> {
        if (
            user &&
            typeof user === 'object' &&
            'naverId' in user &&
            'email' in user &&
            'type' in user &&
            Object.keys(user).length === 3
        ) {
            return await this.authService.socialLogin({
                socialId: user.naverId,
                email: user.email,
                type: user.type
            });
        } else {
            const accessToken = this.authService.createAccessToken(user);
            const refreshToken = this.authService.createRefreshToken(user);
            return { accessToken, refreshToken, user };
        }
    }

    @Public()
    @Get('naver-login')
    @Render('naver-login')
    naverLoginPage() {
        return { message: '이 곳은 네이버 로그인 페이지입니다.' };
    }

    @Public()
    @UseGuards(KakaoGuard)
    @Get('kakao')
    async kakaoLogin() {
        return;
    }

    @Public()
    @UseGuards(KakaoGuard)
    @Get('kakao/callback')
    async kakaoCallback(@CurrentUser() user: any): Promise<LoginResponseDto> {
        if (user.id) {
            return await this.authService.socialLogin({
                socialId: user.kakaoId,
                email: user.email,
                type: user.type
            });
        } else {
            const accessToken = this.authService.createAccessToken(user);
            const refreshToken = this.authService.createRefreshToken(user);
            return { accessToken, refreshToken, user };
        }
    }

    @Public()
    @Get('kakao-login')
    @Render('kakao-login')
    kakaoLoginPage() {
        return { message: '이 곳은 카카오 로그인 페이지입니다.' };
    }
}
