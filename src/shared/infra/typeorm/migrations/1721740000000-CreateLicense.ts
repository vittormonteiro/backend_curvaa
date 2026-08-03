import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLicense1721740000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tb_licencas (
        _uuid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        empresa varchar NOT NULL,
        razao_social varchar NOT NULL,
        cnpj varchar NOT NULL,
        ctt_empresa varchar NOT NULL,
        email_empresa varchar NOT NULL,
        nm_assin varchar NOT NULL,
        ctt_assin varchar NOT NULL,
        email_assin varchar NOT NULL,
        chave varchar NOT NULL,
        limite_usuarios integer NOT NULL DEFAULT 5,
        status boolean NOT NULL DEFAULT true,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        user_at uuid NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_tb_licencas
      ON tb_licencas (cnpj)
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_tb_licencas_chave
      ON tb_licencas (chave)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_licencas_chave`);
    await queryRunner.query(`DROP INDEX IF EXISTS unique_tb_licencas`);
    await queryRunner.query(`DROP TABLE IF EXISTS tb_licencas`);
  }
}
