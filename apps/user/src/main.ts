import {
    BadRequestException,
    ValidationPipe,
    VersioningType
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer, ValidationError } from 'class-validator';
import { BadRequestExceptionFilter } from 'common/exception-filters/bad-request-exception.filter';
import { TransformDataInterceptor } from 'common/interceptors/transform-data.interceptor';
import helmet from 'helmet';
import { AppModule } from './modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use(helmet());

    app.useGlobalInterceptors(new TransformDataInterceptor());

    app.enableVersioning({
        type: VersioningType.URI
    });

    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
            exceptionFactory: (errors: ValidationError[] = []) => {
                return new BadRequestException(errors);
            }
        })
    );

    app.useGlobalFilters(new BadRequestExceptionFilter());

    const config = app.get(ConfigService);

    await app.listen(config.get<number>('app.user.port'));
}
bootstrap();
