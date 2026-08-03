import { MigrationInterface, QueryRunner } from "typeorm";

export class PrepareUserPublicSignup1721741000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE tb_usuario ADD COLUMN IF NOT EXISTS uuidlicenca uuid NULL`);
    await queryRunner.query(`ALTER TABLE tb_usuario ADD COLUMN IF NOT EXISTS senha varchar NULL`);
    await queryRunner.query(`ALTER TABLE tb_usuario ADD COLUMN IF NOT EXISTS token_at text NULL`);
    await queryRunner.query(`ALTER TABLE tb_usuario ADD COLUMN IF NOT EXISTS login_attempts int NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE tb_usuario ADD COLUMN IF NOT EXISTS access_locked_at timestamp NULL`);

    const nullableColumns = [
      'nome_social',
      'dt_nasc',
      'ramal',
      'contato',
      'contato2',
      'nome_ctt2',
      'end_rua',
      'end_complemento',
      'end_numero',
      'end_bairro',
      'end_cidade',
      'end_pais',
      'end_cep',
      'tp_sanguineo',
      'uuiddeparta',
      'uuidsupervisor',
      'tp_cnh',
      'pis',
      'link_lattes',
      'hora_entrada',
      'hora_saida',
      'trabalho',
      'local_trabalho',
      'last_log',
      'aval_treina_obs',
      'aval_obs',
      'aval_por',
    ];

    for (const column of nullableColumns) {
      if (await queryRunner.hasColumn('tb_usuario', column)) {
        await queryRunner.query(`ALTER TABLE tb_usuario ALTER COLUMN ${column} DROP NOT NULL`);
      }
    }

    const defaultColumns = [
      { column: 'banco_horas', value: '0' },
      { column: 'banco_horas_bkp', value: '0' },
      { column: 'comseq', value: 'false' },
      { column: 'aval_prazo', value: '0' },
      { column: 'aval_tecnica', value: '0' },
      { column: 'aval_relaciona', value: '0' },
      { column: 'aval_proativ', value: '0' },
      { column: 'aval_planej', value: '0' },
      { column: 'aval_treina', value: 'false' },
      { column: 'aval_nota', value: '0' },
    ];

    for (const item of defaultColumns) {
      if (await queryRunner.hasColumn('tb_usuario', item.column)) {
        await queryRunner.query(`ALTER TABLE tb_usuario ALTER COLUMN ${item.column} SET DEFAULT ${item.value}`);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const defaultColumns = [
      'banco_horas',
      'banco_horas_bkp',
      'comseq',
      'aval_prazo',
      'aval_tecnica',
      'aval_relaciona',
      'aval_proativ',
      'aval_planej',
      'aval_treina',
      'aval_nota',
    ];

    for (const column of defaultColumns) {
      if (await queryRunner.hasColumn('tb_usuario', column)) {
        await queryRunner.query(`ALTER TABLE tb_usuario ALTER COLUMN ${column} DROP DEFAULT`);
      }
    }
  }
}
