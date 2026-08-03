import {
  ViewEntity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";
  
@ViewEntity('vw_tb_aquisicoes2')
export default class buyServicesProductsView {

  @Column()
  opcoes!: string;

  @PrimaryGeneratedColumn('uuid')
  uuidaquisicao!: string;

  @Column()
  situacao!: string;

  @Column()
  tipo!: string;

  @Column('integer')
  codigo: number;

  @Column()
  descricao!: string;

  @Column()
  valor!: string;

  @Column()
  valor_str!: string;

  @Column()
  total!: string;

  @Column()
  parcelas_n!: string;

  @Column('uuid')
  uuidfornecedor!: string;

  @Column()
  razao_social!: string;

  @Column()
  cpf_cnpj!: string;

  @Column()
  link!: string;

  @Column()
  usuario!: string;

  @Column()
  projetos!: string;

  @Column('text')
  gerentes!: string;

  @Column('text')
  coordenadores!: string;

  @Column('text')
  porcentagens!: string;

  @Column()
  aprovador!: string;

  @Column()
  dt_aprovacao!: string;

  @Column()
  obs!: string;

  @Column()
  orcamento!: string;

  @Column()
  nf!: string;

  @Column()
  avaliador!: string;

  @Column()
  avaliacao!: string;

  @Column()
  dt_avaliacao!: string;

  @Column()
  justificativa!: string;

  @Column()
  descricao_avaliacao!: string;

  @Column()
  enviado!: string;

  @Column()
  atualizado!: string;

  @Column()
  atualizado_por!: string;
  
};
  