import {
  Column,
  PrimaryColumn,
  ViewEntity,
} from "typeorm";

@ViewEntity('vw_tb_usuarios')
export default class usersView {

  @PrimaryColumn()
  uuidusuario!: string;

  @Column()
  opcoes!: string;

  @Column()
  h_status!: string;  

  @Column()
  status!: string;

  @Column()
  usuario!: string;

  @Column()
  doc!: string;

  @Column()
  email!: string;

  @Column()
  contato!: string;

  @Column()
  empresa!: string;

  @Column()
  avatar!: string;

};