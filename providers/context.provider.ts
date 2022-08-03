import { getValue, setValue } from 'express-ctx';

export class ContextProvider {
    private static readonly nameSpace = 'request';

    private static authUser = 'auth_user';

    private static get<T>(key: string): T | undefined {
        return getValue<T>(ContextProvider.getKeyWithNamespace(key));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static set(key: string, value: any): void {
        setValue(ContextProvider.getKeyWithNamespace(key), value);
    }

    private static getKeyWithNamespace(key: string): string {
        return `${ContextProvider.nameSpace}.${key}`;
    }

    static setAuthUser<Entity>(user: Entity): void {
        ContextProvider.set(ContextProvider.authUser, user);
    }

    static getAuthUser<Entity>(): Entity | undefined {
        return ContextProvider.get<Entity>(ContextProvider.authUser);
    }
}
