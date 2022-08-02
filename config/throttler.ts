import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export default registerAs('throttler', (): ThrottlerModuleOptions => {
    return {
        ttl: 60,
        limit: 60,
        storage: new ThrottlerStorageRedisService()
    };
});
