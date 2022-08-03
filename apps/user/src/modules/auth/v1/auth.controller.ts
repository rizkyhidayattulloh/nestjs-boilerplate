import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ILoginResponse } from './interfaces/login.response';

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(private service: AuthService) {}

    @HttpCode(200)
    @Post('login')
    login(@Body() data: LoginDto): Promise<ILoginResponse> {
        return this.service.login(data);
    }

    @HttpCode(200)
    @Post('register')
    async register(@Body() data: RegisterDto): Promise<object> {
        return this.service.register(data);
    }
}
