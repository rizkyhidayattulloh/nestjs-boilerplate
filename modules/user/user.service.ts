import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'common/util';
import { FindOneOptions, Repository } from 'typeorm';
import { UserStoreDto } from './dto/user-store.dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async find(options: FindOneOptions<User>): Promise<User> {
        return this.userRepository.findOne(options);
    }

    async findByColumn(value: string, column: string): Promise<User> {
        return this.userRepository.findOne({ where: { [column]: value } });
    }

    async store(data: UserStoreDto): Promise<User> {
        const user = this.userRepository.create(data);

        if (data.password) user.password = hash(data.password);

        try {
            await this.userRepository.save(user);

            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async update(data: UserUpdateDto): Promise<void> {
        const { id, ...request } = data;

        try {
            await this.userRepository.update(id, request);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
