import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
  
import  {v4 as uuid} from 'uuid';
  
@Entity('tb_aquisicoes')
export default class buyServicesOrProducts {

  @PrimaryGeneratedColumn()
  uuidaquisicao!: string;

  @Column('integer')
  codigo: number;

  @Column('uuid')
  uuidusuario!: string;

  @Column('uuid')
  uuidprojetos!: string[];

  @Column('numeric')
  porcentagens!: number[];

  @Column('uuid')
  uuidfornecedor!: string;

  @Column()
  tipo!: string;

  @Column('text')
  descricao!: string;

  @Column()
  orcamento!: string;

  @Column()
  nf!: string;

  @Column()
  codigo_nf!: string;

  @Column()
  link!: string;

  @Column('numeric')
  valor!: number;

  @Column('numeric')
  parcelas_n!: number;

  @Column('uuid')
  situacao!: string;

  @Column('uuid')
  aprovador!: string;

  @Column()
  dt_aprovacao!: Date;

  @Column('text')
  obs!: string;

  @Column('uuid')
  avaliador!: string;

  @Column('integer')
  avaliacao!: number;

  @Column()
  dt_avaliacao!: Date;

  @Column('text')
  descricao_avaliacao!: string;

  @Column('boolean')
  justificativa!: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_at: string;

  constructor(){
    if (!this.uuidaquisicao){
        this.uuidaquisicao = uuid();
        this.created_at = new Date();
    }
    this.updated_at = new Date();
  };

  
};
  