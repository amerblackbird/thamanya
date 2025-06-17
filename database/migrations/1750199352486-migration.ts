import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750199352486 implements MigrationInterface {
    name = 'Migration1750199352486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "isPublished" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "isPublished"`);
    }

}
