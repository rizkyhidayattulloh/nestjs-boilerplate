import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

export async function hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, 10);
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
