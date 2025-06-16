import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750097546598 implements MigrationInterface {
  name = 'Migration1750097546598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tbl_program_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, "activated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "program_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_fbd8b7689d60f87a769eea19166" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_8d96a2db527aa623a18331b5f4" ON "tbl_program_categories" ("program_id", "category_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tbl_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, "activated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_046cb0b49f35a6e6e5a68a65f83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "tbl_programs" ADD "title" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_program_categories" ADD CONSTRAINT "FK_e55f073ec2adf8943e30d90a1e2" FOREIGN KEY ("program_id") REFERENCES "tbl_programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_program_categories" ADD CONSTRAINT "FK_c6086cf6a3e266f808227b6748c" FOREIGN KEY ("category_id") REFERENCES "tbl_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_program_categories" DROP CONSTRAINT "FK_c6086cf6a3e266f808227b6748c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_program_categories" DROP CONSTRAINT "FK_e55f073ec2adf8943e30d90a1e2"`,
    );
    await queryRunner.query(`ALTER TABLE "tbl_programs" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "tbl_programs" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "tbl_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8d96a2db527aa623a18331b5f4"`,
    );
    await queryRunner.query(`DROP TABLE "tbl_program_categories"`);
  }
}
