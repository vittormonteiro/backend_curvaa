import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_tutoriais')
export default class tutorial {

  @PrimaryGeneratedColumn()
  uuidtutorial!: string;

  @Column('uuid')
  uuidusuario: string;

  @Column('uuid')
  uuidmodulo: string;

  @Column('boolean')
  skipped: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
      if (!this.uuidtutorial){
          this.uuidtutorial = uuid();
          this.created_at = new Date();
      }
      this.updated_at = new Date();
  };

};
