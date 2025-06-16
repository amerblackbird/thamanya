import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750094856364 implements MigrationInterface {
    name = 'Migration1750094856364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "program_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD "publish_date" date`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "description" text`);
        await queryRunner.query(`CREATE TYPE "public"."tbl_programs_type_enum" AS ENUM('podcast', 'documentary')`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "type" "public"."tbl_programs_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "category" text`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "language" text`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" ADD "publish_date" date`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" ADD CONSTRAINT "FK_e93345cd179b9a6447b43bba36c" FOREIGN KEY ("program_id") REFERENCES "tbl_programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP CONSTRAINT "FK_e93345cd179b9a6447b43bba36c"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "publish_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_programs_type_enum"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "publish_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "tbl_episodes" DROP COLUMN "program_id"`);
    }

}
