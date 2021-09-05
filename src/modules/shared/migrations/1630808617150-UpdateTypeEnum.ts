import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTypeEnum1630808617150 implements MigrationInterface {
  name = 'UpdateTypeEnum1630808617150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."type" RENAME TO "type_old"`);
    await queryRunner.query(
      `CREATE TYPE "public"."type" AS ENUM('entry', 'exit')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."passage" ALTER COLUMN "type" TYPE "public"."type" USING "type"::"text"::"public"."type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."type_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."type_old" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."passage" ALTER COLUMN "type" TYPE "public"."type_old" USING "type"::"text"::"public"."type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."type"`);
    await queryRunner.query(`ALTER TYPE "public"."type_old" RENAME TO "type"`);
  }
}
