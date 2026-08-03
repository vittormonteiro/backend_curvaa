import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_notificacao_email')
export default class notification {

  @PrimaryGeneratedColumn()
  uuidnotific!: string;

  @Column('uuid')
  uuidusuario: string;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column()
  send_at!: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){  
    if (!this.uuidnotific){
        this.uuidnotific = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  };
  
};
