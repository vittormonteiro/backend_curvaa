import {
  ViewEntity,
  Column
} from "typeorm";

@ViewEntity('vw_tb_prospeccao_email')
export default class prospectingView {

  @Column('uuid')
  _uuid!: string;

  @Column()
  categoria!: string;

  @Column()
  cliente!: string;

  @Column()
  email!: string;

  @Column()
  titulo!: string;

  @Column()
  saudacao!: string;

  @Column()
  descricao!: string;

  @Column()
  contato!: string;

  @Column()
  enviado!: string;

  @Column()
  atualizado!: string;

  @Column()
  situacao!: string;
  
};
