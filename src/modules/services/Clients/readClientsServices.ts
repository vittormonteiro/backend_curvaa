import { conflict } from "../../../shared/errors/errorFactories";
import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/clientsRepository';

interface IResquestDTO {
    status: string;
    cpf_cnpj: string;
    cliente: string;
    razao_social: string;
    nome: string;
};

export default class readClientsServices {

    public async execute({status, cpf_cnpj, cliente, razao_social, nome}: IResquestDTO): Promise<view[] | view | null | []> {

        if(status){
            return await repositoryView.findByStatus(status);
        }

        if(cpf_cnpj){
            return await repositoryView.findByCNPJ(cpf_cnpj);
        }

        if(nome){
            return await repositoryView.findByText(nome);
        }

        if(cliente){
            return await repositoryView.findByName(cliente);
        }

        if(razao_social){
            return await repositoryView.findByRazaoSocial(razao_social);
        }

        throw conflict('Cliente não cadastrado.');

    };
    
};

