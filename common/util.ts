import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

export function hash(plainText: string): string {
    return bcrypt.hashSync(plainText, 10);
}

export async function hashCheck(
    plainText: string,
    hash: string
): Promise<boolean> {
    if (!plainText || !hash) {
        return Promise.resolve(false);
    }

    return bcrypt.compare(plainText, hash);
}

export function dataSource() {
    return new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['../modules/**/*.entity{.ts/.js}']
    });
}
