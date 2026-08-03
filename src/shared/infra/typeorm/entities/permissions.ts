import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_permissoes')
export default class permissions {

  @PrimaryGeneratedColumn()
  uuidpermissao!: string;

  @Column('uuid')
  uuidusuario!: string;

  @Column('uuid')
  uuidmodulo!: string;

  @Column('boolean')
  create!: boolean;

  @Column('boolean')
  read!: boolean;

  @Column('boolean')
  update!: boolean;

  @Column('boolean')
  delete!: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;

  constructor(){
    if (!this.uuidpermissao){
        this.uuidpermissao = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  };
  
};
