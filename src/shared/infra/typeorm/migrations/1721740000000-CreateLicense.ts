import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLicense1721740000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tb_licenca (
        uuidlicenca uuid PRIMARY KEY,
        uuidcliente uuid NOT NULL,
        chave varchar NOT NULL,
        limite_usuarios integer NOT NULL DEFAULT 5,
        status varchar NOT NULL DEFAULT 'Ativo',
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        user_at uuid NULL
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_tb_licenca_chave
      ON tb_licenca (chave)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_tb_licenca_uuidcliente
      ON tb_licenca (uuidcliente)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_licenca_uuidcliente`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_licenca_chave`);
    await queryRunner.query(`DROP TABLE IF EXISTS tb_licenca`);
  }
}
