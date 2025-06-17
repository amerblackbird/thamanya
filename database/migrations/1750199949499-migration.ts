import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750199949499 implements MigrationInterface {
    name = 'Migration1750199949499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "thumbnailUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "thumbnailUrl"`);
    }

}
