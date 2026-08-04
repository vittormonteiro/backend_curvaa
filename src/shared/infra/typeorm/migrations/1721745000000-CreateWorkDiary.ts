import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkDiary1721745000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tb_diario_obras (
        _uuid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        uuidobra uuid NOT NULL,
        data_vistoria date NOT NULL,
        responsavel_local varchar NOT NULL,
        descricao_atividade text NOT NULL,
        medicao numeric NOT NULL DEFAULT 0,
        observacao text NULL,
        foto1 varchar NULL,
        foto2 varchar NULL,
        foto3 varchar NULL,
        foto4 varchar NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        user_at uuid NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_tb_diario_obras_uuidobra
      ON tb_diario_obras (uuidobra)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_tb_diario_obras_data_vistoria
      ON tb_diario_obras (data_vistoria)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_diario_obras_data_vistoria`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_diario_obras_uuidobra`);
    await queryRunner.query(`DROP TABLE IF EXISTS tb_diario_obras`);
  }
}
