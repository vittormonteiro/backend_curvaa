import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";

import  {v4 as uuid} from 'uuid';

@Entity('tb_clientes')
export default class clients {

    @PrimaryGeneratedColumn()
    uuidcliente!: string;
  
    @Column()
    cliente!: string;

    @Column()
    email!: string;

    @Column()
    contato!: string;

    @Column()
    razao_social!: string;

    @Column()
    cpf_cnpj!: string;

    @Column('boolean')
    status!: boolean;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
    
    @Column('uuid')
    user_at: string;

    constructor(){

      if (!this.uuidcliente){
          this.uuidcliente = uuid();
          this.created_at = new Date();
      }

      this.updated_at = new Date();  
        
    };

};