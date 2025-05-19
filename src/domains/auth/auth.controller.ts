import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto } from './dto/request/login.req';
import { LoginResDto } from './dto/response/login.res';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @ApiOperation({ summary: '로그인' })
    @ApiBody({ type: LoginBodyDto })
    @ApiResponse({ type: LoginResDto })
    @Public()
    @Post('/login')
    async login(@Body() body: LoginBodyDto) {
        return this.service.login(body);
    }
}
