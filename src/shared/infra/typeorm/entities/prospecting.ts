import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_prospeccao_email')
export default class prospecting {

  @PrimaryGeneratedColumn()
  _uuid!: string;

  @Column()
  categoria!: string;

  @Column()
  razao_social: string;

  @Column()
  cnpj!: string;

  @Column()
  email!: string;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column('uuid')
  user_at!: string;

  @Column()
  send_at!: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){  
    if (!this._uuid){
        this._uuid = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  };
  
};
