import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_informativos')
export default class informative {

  @PrimaryGeneratedColumn()
  uuidcomunicado!: string;

  @Column('uuid')
  uuidusuario!: string;

  @Column()
  status!: boolean;

  @Column()
  comunicado!: string;

  @Column('date')
  data!: Date;

  constructor(){
      if (!this.uuidcomunicado){
          this.uuidcomunicado = uuid();
      }
  }
  
};
