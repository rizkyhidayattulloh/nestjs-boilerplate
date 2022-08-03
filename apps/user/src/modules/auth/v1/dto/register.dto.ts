import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUnique } from 'common/decorators/validator.decorator';
import { User } from 'modules/user/user.entity';

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsUnique(User, 'email')
    email: string;

    @IsNotEmpty()
    password: string;
}
