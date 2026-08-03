import { conflict } from "../../../shared/errors/errorFactories";
import {repository, repositoryView, entity} from '../../../shared/infra/typeorm/repositories/informativeRepository';

interface IRequestDTO {
  uuidusuario:string;
  status:boolean;
  comunicado:string;
  data:Date;
};

export default class createInformativeServices {

    public async execute(object: entity): Promise<entity> {

      if (await repositoryView.findByText(object.comunicado)) {
        throw conflict('Já existe.');
      }

      const result =  repository.create(object);

      return await repository.save(result);
      
    };

};
