import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { AuthUserInterceptor } from 'common/interceptors/auth-user.interceptor';

export function Auth<Entity>() {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        UseInterceptors(AuthUserInterceptor<Entity>)
    );
}
