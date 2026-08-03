import { notFound, forbidden } from "../../../shared/errors/errorFactories";
import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/usersAvaliationRepository';

interface IResquestDTO {
  uuidusuario: string;
  user_at: string;
}

export default  class ReadUsersAvaliationServices {

  public async execute({uuidusuario, user_at}: IResquestDTO): Promise<view> {

      const result = await repositoryView.findOneBy({uuidusuario});

      if(!result){
        throw notFound()
      }

      if(result.uuidsupervisor !== user_at){
        throw forbidden('Acesso restrito!')
      }
      
      return result;

  };

};


