import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.userService.createUser(createUserDto);
  }

  @Public()
  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  @Post('admin-sign-up')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto, true);
  }

  @Patch('')
  async updateUser(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete('')
  async deleteUser(@CurrentUser() user: User): Promise<void> {
    return await this.userService.deleteUser(user.id);
  }

  @Post('restore-user')
  async restoreDeletedUser(@CurrentUser() user: User): Promise<void> {
    return await this.userService.restoreDeletedUser(user.id);
  }

  @Get('/my/profile')
  async myProfile(@CurrentUser() user: User): Promise<User> {
    return await this.userService.myProfile(user.id);
  }
}
