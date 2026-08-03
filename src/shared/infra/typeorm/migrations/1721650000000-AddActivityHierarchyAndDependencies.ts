import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivityHierarchyAndDependencies1721650000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tb_atv
      ADD COLUMN IF NOT EXISTS uuidatividade_pai uuid NULL
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tb_atv_dependencias (
        _uuid uuid PRIMARY KEY,
        uuidatividade uuid NOT NULL,
        uuidatividade_dependente uuid NOT NULL,
        tipo varchar NOT NULL DEFAULT 'FIM_INICIO',
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        user_at uuid NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_tb_atv_uuidatividade_pai
      ON tb_atv (uuidatividade_pai)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_tb_atv_dependencias_uuidatividade
      ON tb_atv_dependencias (uuidatividade)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_tb_atv_dependencias_dependente
      ON tb_atv_dependencias (uuidatividade_dependente)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_atv_dependencias_dependente`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_atv_dependencias_uuidatividade`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_atv_uuidatividade_pai`);
    await queryRunner.query(`DROP TABLE IF EXISTS tb_atv_dependencias`);
    await queryRunner.query(`
      ALTER TABLE tb_atv
      DROP COLUMN IF EXISTS uuidatividade_pai
    `);
  }
}
