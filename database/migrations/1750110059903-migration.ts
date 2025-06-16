import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750110059903 implements MigrationInterface {
    name = 'Migration1750110059903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" ALTER COLUMN "type" SET DEFAULT 'podcast'`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "publish_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "publish_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "publish_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "publish_date" date`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
