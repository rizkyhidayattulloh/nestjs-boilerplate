import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { hash } from 'common/util';
import { User } from 'modules/user/user.entity';
import { DataSource } from 'typeorm';

export default class UserSeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const users: User[] = [this.createRandomUser()];

        await dataSource.createEntityManager().save<User>(users);
    }

    private createRandomUser(): User {
        const user = new User();

        user.name = faker.name.firstName();
        user.email = faker.internet.email();
        user.password = hash('password');

        return user;
    }
}
