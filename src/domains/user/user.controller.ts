import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.userService.createUser(createUserDto);
  }
}
