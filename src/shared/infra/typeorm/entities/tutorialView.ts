import {
  ViewEntity,
  Column,
} from "typeorm";

@ViewEntity('vw_tb_tutoriais')
export default class tutorialView {

  @Column('uuid')
  uuidtutorial!: string;

  @Column('uuid')
  uuidusuario!: string;

  @Column()
  usuario!: string;

  @Column('uuid')
  uuidmodulo: string;

  @Column()
  modulo: string;

  @Column()
  tutorial: string;

  @Column('boolean')
  skipped: boolean;

};
