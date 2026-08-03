import {
  Column,
  PrimaryColumn,
  ViewEntity
} from "typeorm";

@ViewEntity('mv_tb_obras')
export default class worksView {

  @PrimaryColumn('uuid')
  _uuid!: string;
  
  @Column()
  opcoes!: string;

  @Column()
  status!: string;

  @Column('uuid')
  uuidlicenca!: string;

  @Column()
  empresa!: string;

  @Column()
  codigo!: string;

  @Column()
  titulo!: string;

  @Column()
  escopo!: string;

  @Column()
  uuidcliente!: string;

  @Column()
  cliente!: string;

  @Column()
  valor!: number;

  @Column()
  valor_str!: string;

  @Column()
  data: string;

  @Column()
  previsao: string;

  @Column()
  dt_fim: string;
  
  @Column()
  created_at: string;

  @Column()
  updated_at: string;
  
  @Column('uuid')
  user_at: string;

};
