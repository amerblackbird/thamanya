import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750198862667 implements MigrationInterface {
    name = 'Migration1750198862667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "audioUrl" text`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "imageUrl" text`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "videoUrl" text`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "transcriptUrl" text`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "externalUrl" text`);
        await queryRunner.query(`CREATE TYPE "public"."tbl_episodes_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "status" "public"."tbl_episodes_status_enum" NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ALTER COLUMN "language" SET DEFAULT 'en'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_programs" ALTER COLUMN "language" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_episodes_status_enum"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "externalUrl"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "transcriptUrl"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "videoUrl"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "audioUrl"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "category" text`);
    }

}
