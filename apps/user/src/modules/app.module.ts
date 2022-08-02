import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidatorModule } from 'common/validators/validator.module';
import { config } from 'config';
import { AuthModule } from './auth/auth.module';

const modules = [AuthModule];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: config
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('database')
        }),
        ValidatorModule,
        ...modules
    ]
})
export class AppModule {}
