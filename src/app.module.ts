import { Module } from '@nestjs/common';
import { MysqlModule } from './database/mysql.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domains/user/user.module';
import { PerfumeModule } from './domains/perfume/perfume.module';
import { AuthModule } from './domains/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './domains/auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MysqlModule,
    UserModule,
    PerfumeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
