import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: true,
        default: () => 'now()'
    })
    createdAt?: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
        default: () => 'now()',
        onUpdate: 'now()'
    })
    updatedAt?: Date;
}
