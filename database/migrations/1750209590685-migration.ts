import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750209590685 implements MigrationInterface {
    name = 'Migration1750209590685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "search_vector" tsvector`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "search_vector" tsvector`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "search_vector"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "search_vector"`);
    }

}
