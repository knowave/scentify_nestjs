import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setBaseViewsDir(join(__dirname, '../src', 'views'));
    app.useStaticAssets(join(__dirname, '../src', 'public'));
    app.setViewEngine('ejs');
    app.useGlobalPipes(new ValidationPipe());

    if (process.env.NODE_ENV !== 'prod') SwaggerConfig(app);

    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
