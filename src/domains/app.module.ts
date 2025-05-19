import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from 'src/database/postgres.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PerfumeModule } from './perfume/perfume.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/utils/exception.filter';
import { JwtGuard } from './auth/guards/jwt.guard';

@Module({
    imports: [PostgresModule, UserModule, AuthModule, PerfumeModule],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: CustomExceptionFilter },
        { provide: APP_GUARD, useClass: JwtGuard }
    ]
})
export class AppModule {}
