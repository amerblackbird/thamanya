import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750108252909 implements MigrationInterface {
    name = 'Migration1750108252909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_categories" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_categories" ALTER COLUMN "title" SET NOT NULL`);
    }

}
