import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    providers: [UserRepository, UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
