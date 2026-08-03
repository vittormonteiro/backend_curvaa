import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_atv')
export default class activities {

  @PrimaryGeneratedColumn()
  _uuid!: string;

  @Column()
  etapa!: string;

  @Column()
  atividade!: string;

  @Column()
  descricao!: string;

  @Column()
  status!: boolean;

  @Column()
  uuidobra!: string;

  @Column('uuid', { nullable: true })
  uuidatividade_pai!: string | null;

  @Column('date')
  dt_inicio!: Date;

  @Column('integer')
  tempo!: number;

  @Column('date')
  dt_fim!: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;
    
  constructor(){
    if (!this._uuid){
        this._uuid = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  }
  
};
