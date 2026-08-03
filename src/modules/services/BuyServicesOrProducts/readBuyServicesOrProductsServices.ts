import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/buyServicesProductsRepository';

interface IRequestDTO {
  situacao: string;
  uuidaquisicao: string;
};

export default class readBuyServicesOrProductsServices {

  public async execute({situacao, uuidaquisicao}:IRequestDTO): Promise<view[] | view | null> {

    return  uuidaquisicao ? await repositoryView.findOneBy({uuidaquisicao: uuidaquisicao}) : 
    await repositoryView.findByStatus(situacao);
    
  };

};