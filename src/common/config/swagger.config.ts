import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfig(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Scentify API Docs')
        .setDescription('Scentify API Documentation')
        .setVersion('1.0')
        .addBearerAuth({
            description: 'JWT Authorization header using the Bearer scheme',
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
