import {
    ViewEntity,
    Column
  } from "typeorm";
  
  @ViewEntity('vw_tb_dias_uteis_')
  export default class daysView {

    @Column()
    opcoes !:string; 
  
    @Column('uuid')
    uuiddiasuteis!: string;

    @Column()
    ano!: string;
  
    @Column()
    mes !:string;

    @Column()
    codigo !:string;

    @Column()
    dias !:string; 

    @Column('date')
    quintodiautil !:Date; 

    @Column()
    feriados!: string;

    @Column()
    created_at: string;
  
    @Column()
    updated_at: string;
    
    @Column()
    user_at: string;
    
  };
