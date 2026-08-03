import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_usuario')
export default class users {

  @PrimaryGeneratedColumn()
  uuidusuario!: string;

  @Column('uuid', { nullable: true })
  uuidlicenca!: string;

  @Column()
  login!: string;

  @Column()
  usuario!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  senha!: string;

  @Column({ nullable: true })
  contato!: string;
  
  @Column()
  cpf!: string;
 
  @Column()
  status!: string;

  @Column({ nullable: true })
  last_log!: Date;

  @Column('boolean')
  termos_uso!: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @Column('uuid')
  user_at: string;

  @Column({ nullable: true })
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
