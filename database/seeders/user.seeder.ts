import { User } from 'modules/user/user.entity';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class UserSeeder implements Seeder {
    public async run(factory: Factory, dataSource: DataSource): Promise<any> {
        const users = await factory(User)().makeMany(10);

        await dataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(users)
            .execute();
    }
}
