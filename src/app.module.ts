import { Module } from '@nestjs/common';
import { MysqlModule } from './database/mysql.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domains/user/user.module';
import { PerfumeModule } from './domains/perfume/perfume.module';
import { AuthModule } from './domains/auth/auth.module';

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
  providers: [],
})
export class AppModule {}
