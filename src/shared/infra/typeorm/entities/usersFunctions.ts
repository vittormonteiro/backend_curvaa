import {
  Entity,
  Column,
  PrimaryGeneratedColumn 
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_users_function')
export default class usersFunctions {

  @PrimaryGeneratedColumn()
  uuidfunction!: string;

  @Column('date')
  descricao !:string;

  
  

  
  


  constructor(){
      if (!this.uuidfunction){
          this.uuidfunction = uuid();
      }
  }
};
