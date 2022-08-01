import { registerAs } from "@nestjs/config";

export default registerAs('app', () => {
    return {
        env: process.env.APP_ENV,
        user: {
            port: +process.env.USER_PORT
        },
        admin: {
            port: +process.env.ADMIN_PORT
        }
    }
})