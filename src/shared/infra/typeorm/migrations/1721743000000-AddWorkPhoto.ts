import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkPhoto1721743000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tb_obras ADD COLUMN IF NOT EXISTS foto varchar NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tb_obras DROP COLUMN IF EXISTS foto`);
  }
}
