import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'modules/user/user.module';
import { AuthController as AuthControllerV1 } from './v1/auth.controller';
import { AuthService as AuthServiceV1 } from './v1/auth.service';
import { JwtStrategy } from './v1/jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('jwt')
        }),
        UserModule
    ],
    controllers: [AuthControllerV1],
    providers: [AuthServiceV1, JwtStrategy]
})
export class AuthModule {}
