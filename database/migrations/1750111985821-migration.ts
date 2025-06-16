import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750111985821 implements MigrationInterface {
    name = 'Migration1750111985821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "publish_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "publish_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "publish_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "publish_date" date`);
    }

}
