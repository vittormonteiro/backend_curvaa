import { conflict } from "../../../shared/errors/errorFactories";
import {repository, repositoryView, entity, view} from '../../../shared/infra/typeorm/repositories/clientsRepository';

export default class createClientsServices {

  public async execute(object: entity): Promise<view | null> {

    if (await repositoryView.findByRazaoSocial(object.razao_social)){
      throw conflict(`Razão social ${object.razao_social} já existe.`);
    }
    
    if (await repositoryView.findByCNPJ(object.cpf_cnpj)){
      throw conflict(`CNPJ ${object.cpf_cnpj} já existe.`);
    }

    const result =  repository.create(object);
      
    await repository.save(result);

    const uuidcliente = result.uuidcliente;

    return repositoryView.findOneBy({uuidcliente});


  };

};


