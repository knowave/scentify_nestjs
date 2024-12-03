import { Module } from '@nestjs/common';
import { MysqlModule } from './database/mysql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MysqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
