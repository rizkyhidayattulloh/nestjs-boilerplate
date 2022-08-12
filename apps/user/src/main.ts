import {
    ClassSerializerInterceptor,
    HttpStatus,
    UnprocessableEntityException,
    ValidationPipe,
    VersioningType
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { UnprocessableEntityExceptionFilter } from 'common/exception-filters/http-exception.filter';
import helmet from 'helmet';
import { middleware as expressCtx } from 'express-ctx';
import { AppModule } from './modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });

    const reflector = app.get(Reflector);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use(helmet());

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.enableVersioning({
        type: VersioningType.URI
    });

    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
            transform: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            exceptionFactory: (errors) =>
                new UnprocessableEntityException(errors)
        })
    );

    app.useGlobalFilters(new UnprocessableEntityExceptionFilter());

    app.use(expressCtx);

    const config = app.get(ConfigService);

    await app.listen(config.get<number>('app.user.port'));
}
bootstrap();
