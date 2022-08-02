import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashCheck } from 'common/util';
import { UserService } from 'modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { ILoginResponse } from './interfaces/login.response';
import { IJwtPayload } from './interfaces/jwt-payload';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(data: LoginDto): Promise<ILoginResponse> {
        const { email, password } = data;
        const user = await this.userService.find({
            where: { email }
        });

        if (!user) throw new BadRequestException('invalid credential');

        const isValidCredential = await hashCheck(password, user.password);

        if (!isValidCredential)
            throw new BadRequestException('invalid credential');

        const payload: IJwtPayload = { id: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    async register(data: RegisterDto): Promise<object> {
        await this.userService.store(data);

        return {};
    }
}
