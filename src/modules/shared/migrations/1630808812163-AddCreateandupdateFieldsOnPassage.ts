import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreateandupdateFieldsOnPassage1630808812163 implements MigrationInterface {
    name = 'AddCreateandupdateFieldsOnPassage1630808812163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."passage" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."passage" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."passage" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."passage" DROP COLUMN "created_at"`);
    }

}
