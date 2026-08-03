import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity('tb_licenca')
export default class license {

  @PrimaryColumn('uuid')
  uuidlicenca!: string;

  @Column('uuid')
  uuidcliente!: string;

  @Column()
  chave!: string;

  @Column('integer')
  limite_usuarios!: number;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid', { nullable: true })
  user_at: string;

  constructor() {
    if (!this.uuidlicenca) {
      this.uuidlicenca = uuid();
      this.created_at = new Date();
    }

    this.updated_at = new Date();
  }

};
