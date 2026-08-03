import {
  ViewEntity,
  Column
} from "typeorm";

@ViewEntity('vw_tb_modulos')
export default class modulesView {

  @Column('uuid')
  uuidmodulo!: string;

  @Column()
  descricao!: string;

  @Column()
  tutorial!: string;
  
};
