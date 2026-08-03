import {
  ViewEntity,
  Column
} from "typeorm";

@ViewEntity('vw_tb_atv')
export default class activitiesView {

 @Column('uuid')
  _uuid!: string;

  @Column()
  opcoes!: string; 
  
  @Column()
  etapa!: string;

  @Column()
  atividade!: string;

  @Column()
  descricao!: string;

  @Column()
  status!: string;

  @Column()
  status_str!: string;

  @Column()
  status_color!: string;

  @Column('uuid')
  uuidlicenca!: string;

  @Column()
  empresa!: string;

  @Column('uuid')
  uuidobra!: string;

  @Column()
  obra!: string;

  @Column('date')
  dt_inicio!: Date;

  @Column()
  dt_inicio_str!: string;

  @Column('date')
  dt_previsao!: Date;

  @Column()
  dt_previsao_str!: string;

  @Column('date')
  dt_fim!: Date;

  @Column()
  dt_fim_str!: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  user_at: string;

};
