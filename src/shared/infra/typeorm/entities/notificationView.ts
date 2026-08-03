import {
  ViewEntity,
  Column
} from "typeorm";

@ViewEntity('vw_notification')
export default class notificationView {

  @Column()
  uuidusuario!: string;

  @Column()
  usuario!: string;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column()
  status!: string;

  @Column()
  href!: string;

  @Column()
  sendemail!: boolean;
  
};
