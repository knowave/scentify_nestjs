import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { S3Module } from '../s3/s3.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([User]), S3Module],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService, UserRepository]
})
export class UserModule {}
