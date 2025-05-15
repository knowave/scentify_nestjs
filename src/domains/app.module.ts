import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from 'src/database/postgres.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PerfumeModule } from './perfume/perfume.module';

@Module({
    imports: [PostgresModule, UserModule, AuthModule, PerfumeModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
