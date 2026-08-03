import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_usuarios_recup')
export default class usersRepair {

  @PrimaryGeneratedColumn()
  _uuid!: string;

  @Column()
  uuidusuario!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if (!this._uuid){
        this._uuid = uuid();
        this.created_at = new Date();
    }
  }

};
