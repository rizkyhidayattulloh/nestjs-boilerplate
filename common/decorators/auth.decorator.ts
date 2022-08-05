import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import type { AbstractEntity } from 'common/abstract/abstract.entity';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { AuthUserInterceptor } from 'common/interceptors/auth-user.interceptor';

export function Auth<Entity extends AbstractEntity>() {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        UseInterceptors(AuthUserInterceptor<Entity>)
    );
}
