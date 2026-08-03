import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity('tb_atv_dependencias')
export default class activitiesDependencies {

  @PrimaryColumn('uuid')
  _uuid!: string;

  @Column('uuid')
  uuidatividade!: string;

  @Column('uuid')
  uuidatividade_dependente!: string;

  @Column()
  tipo!: string;

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
