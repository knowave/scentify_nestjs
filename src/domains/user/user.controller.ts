import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.userService.createUser(createUserDto);
  }

  @Public()
  @Get('/:id')
  async getUserById(@CurrentUser() user: User): Promise<User> {
    return await this.userService.getUserById(user.id);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  @Post('admin-sign-up')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto, true);
  }
}
