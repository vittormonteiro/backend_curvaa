import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_obras')
export default class works {

  @PrimaryGeneratedColumn()
  _uuid!: string;

  @Column()
  status!: string;

  @Column()
  codigo!: string;

  @Column()
  titulo!: string;

  @Column()
  escopo!: string;

  @Column('date')
  data!: Date;

  @Column('date')
  previsao!: Date;  
  
  @Column('date')
  dt_fim!: Date;

  @Column()
  uuidcliente!: string;

  @Column('uuid')
  uuidlicenca!: string;

  @Column('numeric')
  valor!: Number;

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
  };

};
