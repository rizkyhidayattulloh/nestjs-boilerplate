import * as bcrypt from 'bcrypt';

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

export function rand(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}
