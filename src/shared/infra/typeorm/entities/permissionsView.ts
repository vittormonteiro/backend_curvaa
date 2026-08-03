import {
  Column,
  ViewEntity,
} from "typeorm";

@ViewEntity('vw_tb_permissoes')
export default class permissionsView {

  @Column('uuid')
  uuidpermissao!: string;
  
  @Column()
  usuario!: string;

  @Column()
  uuidmodulo!: string;

  @Column()
  modulo!: string;

  @Column('boolean')
  create!: boolean;

  @Column('boolean')
  read!: boolean;

  @Column('boolean')
  update!: boolean;

  @Column('boolean')
  delete!: boolean;

  @Column()
  enviado!: string;

  @Column()
  atualizado!: string;

  @Column()
  atualizado_por!: string;
  
};
