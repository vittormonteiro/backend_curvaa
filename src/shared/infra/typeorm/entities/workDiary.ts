import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity('tb_diario_obras')
export default class workDiary {

  @PrimaryGeneratedColumn()
  _uuid!: string;

  @Column('uuid')
  uuidobra!: string;

  @Column('date')
  data_vistoria!: Date;

  @Column()
  responsavel_local!: string;

  @Column()
  descricao_atividade!: string;

  @Column('numeric')
  medicao!: number;

  @Column('text', { nullable: true })
  observacao!: string | null;

  @Column('varchar', { nullable: true })
  foto1!: string | null;

  @Column('varchar', { nullable: true })
  foto2!: string | null;

  @Column('varchar', { nullable: true })
  foto3!: string | null;

  @Column('varchar', { nullable: true })
  foto4!: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;

  constructor() {
    if (!this._uuid) {
      this._uuid = uuid();
      this.created_at = new Date();
    }

    this.updated_at = new Date();
  }

};
