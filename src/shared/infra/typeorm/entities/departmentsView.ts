import {
  ViewEntity,
  Column
} from "typeorm";

@ViewEntity('vw_tb_departa')
export default class departmentsView {

  @Column()
  opcoes!: string;

  @Column()
  uuiddeparta!:string;

  @Column()
  departamento!:string;

  @Column()
  descricao!:string;

  @Column()
  usuario!:string;

  @Column()
  status!: string;

};
