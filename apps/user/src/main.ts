import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { AppModule } from './modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use(helmet());

    app.enableVersioning({
        type: VersioningType.URI
    });

    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true
        })
    );

    const config = app.get(ConfigService);

    await app.listen(config.get<number>('app.user.port'));
}
bootstrap();
