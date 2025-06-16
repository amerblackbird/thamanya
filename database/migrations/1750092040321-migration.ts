import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750092040321 implements MigrationInterface {
  name = 'Migration1750092040321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tbl_episodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, "activated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0be63fbe2bb2d78c44898665a26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tbl_programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, "activated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_4dd93e256d6da08c93f944c2319" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tbl_programs"`);
    await queryRunner.query(`DROP TABLE "tbl_episodes"`);
  }
}
