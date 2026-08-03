import {
    ViewEntity,
    Column
} from "typeorm";


@ViewEntity('vw_tb_clientes_')
export default class clientsView {

    @Column()
    opcoes!: string;

    @Column('uuid')
    uuidcliente!: string;

    @Column()
    categoria!: string;

    @Column()
    cliente!: string;

    @Column()
    razao_social!: string;

    @Column()
    _cpf_cnpj!: string;

    @Column()
    cpf_cnpj!: string;

    @Column()
    email!: string;

    @Column()
    contato!: string;

    @Column()
    status!: string;

    @Column()
    created_at: string;
  
    @Column()
    updated_at: string;
    
    @Column()
    user_at: string;

};