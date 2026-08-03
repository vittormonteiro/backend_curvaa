import { notFound, conflict } from "../../../shared/errors/errorFactories";
import {repository, repositoryView, entity, view} from '../../../shared/infra/typeorm/repositories/clientsRepository';

export default class updateClientsServices {

  public async execute(object: entity): Promise<view | null> {

    const uuidcliente = object.uuidcliente;

    const result = await repository.findOneBy({uuidcliente});

    if(!result){
      throw notFound();
    }

    if(result.razao_social != object.razao_social){

        if(await repositoryView.findByRazaoSocial(object.razao_social)){
          throw conflict(`Razão social ${object.razao_social} já existe.`);
        }

    }

    if(result.cpf_cnpj != object.cpf_cnpj){

      if(await repositoryView.findByCNPJ(object.cpf_cnpj)){
        throw conflict(`CPF OU CPNJ ${object.cpf_cnpj} já existe.`);
      }
       
    }

    await repository.save(object);

    return repositoryView.findOneBy({uuidcliente});

  };

};
