import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  import  {v4 as uuid} from 'uuid';
  
  @Entity('tb_dias_uteis')
  export default class days {
  
    @PrimaryGeneratedColumn()
    uuiddiasuteis!: string;

    @Column()
    ano!: string;

    @Column()
    codigo !:string;

    @Column()
    dias !:string; 
  
    @Column('date')
    quintodiautil!: Date; 

    @Column()
    feriados!: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
    
    @Column('uuid')
    user_at: string;

    constructor(){

      if (!this.uuiddiasuteis){
          this.uuiddiasuteis = uuid();
          this.created_at = new Date();
      }

      this.updated_at = new Date();  
        
    };

  };
