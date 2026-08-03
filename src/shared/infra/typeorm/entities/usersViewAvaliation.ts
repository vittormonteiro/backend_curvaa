import {
  Column,
  PrimaryColumn,
  ViewEntity,
} from "typeorm";

@ViewEntity('vw_tb_usuarios_avaliacao')
export default class usersViewAvaliation {

  @PrimaryColumn()
  uuidusuario!: string;

  @Column()
  usuario!: string;

  @Column()
  status!: string;

  @Column('integer')
  aval_prazo!: number;

  @Column('integer')
  aval_tecnica!: number;

  @Column('integer')
  aval_relaciona!: number;

  @Column('integer')
  aval_proativ!: number;

  @Column('integer')
  aval_planej!: number;

  @Column('integer')
  aval_treina!: number;

  @Column()
  aval_treina_obs!: string;

  @Column()
  aval_obs!: string;  

  @Column()
  aval_data!: string;

  @Column()
  aval_por!: string;

  @Column()
  aval_nota!: string;

  @Column('uuid')
  uuidsupervisor!: string;

  @Column()
  supervisor!: string;

  @Column()
  local_trabalho!: string;

  @Column()
  avatar!: string;

};