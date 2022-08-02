import { AbstractEntity } from 'common/abstract/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
