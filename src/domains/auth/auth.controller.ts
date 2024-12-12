import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { NaverGuard } from './guards/naver.guard';

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
  async naverCallback(@CurrentUser() user) {
    return await this.authService.naverLogin({
      socialId: user.naverId,
      email: user.email,
      type: user.type,
    });
  }

  @Public()
  @Get('naver-login')
  @Render('naver-login')
  naverLoginPage() {
    return { message: '이 곳은 네이버 로그인 페이지입니다.' };
  }
}
