import {
  ViewEntity,
  Column
} from "typeorm";

@ViewEntity('vw_tb_notificacao_email')
export default class notificationEmailView {

  @Column()
  uuidnotific!: string;

  @Column()
  uuidusuario!: string;

  @Column()
  usuario!: string;

  @Column()
  email!: string;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column()
  situacao!: string;
  
};
