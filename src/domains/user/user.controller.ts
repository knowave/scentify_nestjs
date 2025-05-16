import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @ApiOperation({ summary: '회원가입' })
    @ApiBody({ type: CreateUserDto })
    @Public()
    @Post('/sign-up')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.service.createUser(createUserDto);
    }

    @ApiOperation({ summary: '사용자 조회' })
    @ApiResponse({ type: User })
    @Get('/:id')
    async getUser(@Param('id') id: number) {
        return this.service.getUserById(id);
    }

    @ApiOperation({ summary: '사용자 수정' })
    @ApiBody({ type: UpdateUserDto })
    @Patch('')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @CurrentUser() { id }: CurrentUserType) {
        return this.service.updateUser({ id, updateUserDto });
    }

    @ApiOperation({ summary: '사용자 삭제' })
    @Delete('')
    async deleteUser(@CurrentUser() { id }: CurrentUserType) {
        return this.service.deleteUser(id);
    }
}
