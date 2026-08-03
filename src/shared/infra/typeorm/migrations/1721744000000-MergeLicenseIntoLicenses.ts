import { MigrationInterface, QueryRunner } from "typeorm";

export class MergeLicenseIntoLicenses1721744000000 implements MigrationInterface {
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

    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS _uuid uuid DEFAULT uuid_generate_v4()`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS empresa varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS razao_social varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS cnpj varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS ctt_empresa varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS email_empresa varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS nm_assin varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS ctt_assin varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS email_assin varchar NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS chave varchar`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS limite_usuarios integer NOT NULL DEFAULT 5`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS status boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS created_at timestamp NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS updated_at timestamp NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE tb_licencas ADD COLUMN IF NOT EXISTS user_at uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'`);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conrelid = 'tb_licencas'::regclass
            AND contype = 'p'
        ) THEN
          ALTER TABLE tb_licencas ADD CONSTRAINT pk_tb_licencas PRIMARY KEY (_uuid);
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_tb_licencas_chave
      ON tb_licencas (chave)
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_tb_licencas
      ON tb_licencas (cnpj)
    `);

    if (await queryRunner.hasTable('tb_licenca')) {
      await queryRunner.query(`ALTER TABLE tb_licenca ADD COLUMN IF NOT EXISTS limite_usuarios integer NOT NULL DEFAULT 5`);
      await queryRunner.query(`ALTER TABLE tb_licenca ADD COLUMN IF NOT EXISTS status varchar NOT NULL DEFAULT 'Ativo'`);
      await queryRunner.query(`ALTER TABLE tb_licenca ADD COLUMN IF NOT EXISTS created_at timestamp NOT NULL DEFAULT now()`);
      await queryRunner.query(`ALTER TABLE tb_licenca ADD COLUMN IF NOT EXISTS updated_at timestamp NOT NULL DEFAULT now()`);
      await queryRunner.query(`ALTER TABLE tb_licenca ADD COLUMN IF NOT EXISTS user_at uuid NULL`);

      await queryRunner.query(`
        INSERT INTO tb_licencas (
          _uuid,
          empresa,
          razao_social,
          cnpj,
          ctt_empresa,
          email_empresa,
          nm_assin,
          ctt_assin,
          email_assin,
          chave,
          limite_usuarios,
          status,
          created_at,
          updated_at,
          user_at
        )
        SELECT
          l.uuidlicenca,
          COALESCE(c.cliente, 'LICENCA'),
          COALESCE(c.razao_social, c.cliente, 'LICENCA'),
          COALESCE(c.cpf_cnpj, l.uuidcliente::text, l.uuidlicenca::text),
          COALESCE(c.contato, ''),
          COALESCE(c.email, ''),
          COALESCE(c.cliente, 'ADMIN'),
          COALESCE(c.contato, ''),
          COALESCE(c.email, ''),
          l.chave,
          COALESCE(limite_usuarios, 5),
          CASE WHEN COALESCE(l.status, 'Ativo') IN ('Ativo', 'ativo', 'true', 'TRUE', '1') THEN true ELSE false END,
          COALESCE(l.created_at, now()),
          COALESCE(l.updated_at, now()),
          COALESCE(l.user_at, '00000000-0000-0000-0000-000000000000'::uuid)
        FROM tb_licenca l
        LEFT JOIN tb_clientes c ON c.uuidcliente = l.uuidcliente
        ON CONFLICT (_uuid) DO UPDATE SET
          empresa = EXCLUDED.empresa,
          razao_social = EXCLUDED.razao_social,
          cnpj = EXCLUDED.cnpj,
          ctt_empresa = EXCLUDED.ctt_empresa,
          email_empresa = EXCLUDED.email_empresa,
          nm_assin = EXCLUDED.nm_assin,
          ctt_assin = EXCLUDED.ctt_assin,
          email_assin = EXCLUDED.email_assin,
          chave = EXCLUDED.chave,
          limite_usuarios = EXCLUDED.limite_usuarios,
          status = EXCLUDED.status,
          updated_at = EXCLUDED.updated_at,
          user_at = EXCLUDED.user_at
      `);

      await queryRunner.query(`DROP INDEX IF EXISTS idx_tb_licenca_chave`);
      await queryRunner.query(`DROP TABLE IF EXISTS tb_licenca`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
      INSERT INTO tb_licenca (
        uuidlicenca,
        uuidcliente,
        chave,
        limite_usuarios,
        status,
        created_at,
        updated_at,
        user_at
      )
      SELECT
        l._uuid,
        c.uuidcliente,
        chave,
        COALESCE(l.limite_usuarios, 5),
        CASE WHEN l.status THEN 'Ativo' ELSE 'Inativo' END,
        COALESCE(l.created_at, now()),
        COALESCE(l.updated_at, now()),
        l.user_at
      FROM tb_licencas l
      JOIN tb_clientes c ON c.cpf_cnpj = l.cnpj
      ON CONFLICT (uuidlicenca) DO NOTHING
    `);
  }
}
