import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity('tb_licencas')
export default class license {

  @PrimaryColumn('uuid', { name: '_uuid' })
  uuidlicenca!: string;

  @Column()
  empresa!: string;

  @Column()
  razao_social!: string;

  @Column()
  cnpj!: string;

  @Column()
  ctt_empresa!: string;

  @Column()
  email_empresa!: string;

  @Column()
  nm_assin!: string;

  @Column()
  ctt_assin!: string;

  @Column()
  email_assin!: string;

  @Column()
  chave!: string;

  @Column('integer')
  limite_usuarios!: number;

  @Column('boolean')
  status!: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;

  constructor() {
    if (!this.uuidlicenca) {
      this.uuidlicenca = uuid();
      this.created_at = new Date();
    }

    this.updated_at = new Date();
  }

};
