import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_usuario')
export default class access {

  @PrimaryGeneratedColumn()
  uuidusuario!: string;

  @Column()
  uuidlicenca!: string;

  @Column()
  login!: string;

  @Column()
  email!: string;

  @Column()
  senha!: string;

  @Column()
  status!: string;

  @Column()
  last_log!: Date;

  @Column('boolean')
  termos_uso!: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @Column('uuid')
  user_at: string;

  @Column()
  token_at: string;

  @Column("int", { default: 0 })
  login_attempts!: number;

  @Column("timestamp", { nullable: true })
  access_locked_at!: Date | null;

  constructor(){
    if (!this.uuidusuario){
        this.uuidusuario = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();  
  }

};
