import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_modulos')
export default class modules {

  @PrimaryGeneratedColumn()
  uuidmodulo!: string;

  @Column()
  descricao!: string;

  @Column()
  tutorial!: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;

  constructor(){  
    if (!this.uuidmodulo){
        this.uuidmodulo = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  };
  
};
