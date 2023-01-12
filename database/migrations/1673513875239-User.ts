import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1673513875239 implements MigrationInterface {
    name = 'User1673513875239';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``
        );
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
        );
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
