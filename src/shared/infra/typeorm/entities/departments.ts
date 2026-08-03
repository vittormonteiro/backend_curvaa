import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_departa')
export default class departments {

  @PrimaryGeneratedColumn()
  uuiddeparta!: string;

  @Column()
  departamento!: string;

  @Column()
  descricao!: string;

  @Column('uuid')
  uuidsupervisor!: string;

  @Column('boolean')
  status!: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;

  constructor(){  
    if (!this.uuiddeparta){
        this.uuiddeparta = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  };
  
};
