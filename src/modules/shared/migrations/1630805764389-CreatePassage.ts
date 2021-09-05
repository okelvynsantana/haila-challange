import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePassage1630805764389 implements MigrationInterface {
  name = 'CreatePassage1630805764389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "type" AS ENUM('0', '1')`);
    await queryRunner.query(
      `CREATE TABLE "passage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "type" NOT NULL, "lat" double precision NOT NULL, "lng" double precision NOT NULL, CONSTRAINT "PK_960fffaf8e207606b8d4810ea0a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "passage"`);
    await queryRunner.query(`DROP TYPE "type"`);
  }
}
