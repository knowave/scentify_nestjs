import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from './dto/request/create-user.req';
import { User } from './entities/user.entity';
import { UpdateUserBody } from './dto/request/update-user.req';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { GetUserByIdWithPerfume } from './dto/response/get-user-by-id-with-perfume.res';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @ApiOperation({ summary: '회원가입' })
    @ApiBody({ type: CreateUserBody })
    @Public()
    @Post('/sign-up')
    async signup(@Body() createUserDto: CreateUserBody) {
        return this.service.createUser(createUserDto);
    }

    @ApiOperation({ summary: '사용자 조회' })
    @ApiResponse({ type: User })
    @Get('/:id')
    async getUser(@Param('id') id: number) {
        return this.service.getUserById(id);
    }

    @ApiOperation({ summary: '사용자 수정' })
    @ApiBody({ type: UpdateUserBody })
    @Patch('')
    async updateUser(@Body() updateUserDto: UpdateUserBody, @CurrentUser() { id }: CurrentUserType) {
        return this.service.updateUser({ id, updateUserDto });
    }

    @ApiOperation({ summary: '사용자 삭제' })
    @Delete('')
    async deleteUser(@CurrentUser() { id }: CurrentUserType) {
        return this.service.deleteUser(id);
    }

    @ApiOperation({ summary: '내 프로필 조회' })
    @ApiResponse({ type: GetUserByIdWithPerfume })
    @Get('/me')
    async getMyProfile(@CurrentUser() { id }: CurrentUserType) {
        return this.service.getUserByIdWithPerfume(id);
    }

    @ApiOperation({ summary: '회원탈퇴 후 30일이 지나지 않은 사용자 회원탈퇴 취소' })
    @Patch('/restore-user')
    async restoreUser(@CurrentUser() { id }: CurrentUserType) {
        return this.service.restoreUser(id);
    }
}
