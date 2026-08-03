import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_ceps')
export default class ceps {

  @PrimaryGeneratedColumn()
  uuidcep!: string;

  @Column()
  cep!: string;

  @Column()
  uf!: string;

  @Column()
  cidade!: string;

  @Column()
  nome!: string;

  @Column()
  trecho!: string;

  @Column()
  bairro!: string;
  
  @Column()
  pais!: string;

  @Column()
  abreviado!: string;

  constructor(){
      if (!this.uuidcep){
          this.uuidcep = uuid();
      }
  }
  
};
