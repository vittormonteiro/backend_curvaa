import {badRequest} from '../../../shared/errors/errorFactories';
import {repositoryView, view} from '../../../shared/infra/typeorm/repositories/usersRepository';

interface IResquestDTO {
  uuidusuario: string;
  status: string;
  doc: string;
}

export default  class readUsersServices {

  public async execute({uuidusuario, status, doc}: IResquestDTO): Promise<view[] | [] | view | null> {

      return uuidusuario ? repositoryView.findOneBy({uuidusuario}):
      doc ? await repositoryView.findDoc(doc) :
      status ? await repositoryView.findUsersByStatus(status) :
      badRequest();

  };

};

