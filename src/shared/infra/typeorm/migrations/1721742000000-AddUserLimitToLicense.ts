import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserLimitToLicense1721742000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tb_licenca
      ADD COLUMN IF NOT EXISTS limite_usuarios integer NOT NULL DEFAULT 5
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tb_licenca
      DROP COLUMN IF EXISTS limite_usuarios
    `);
  }
}
