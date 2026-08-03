import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/informativeRepository';

export default  class updateInformativeServices {

    public async execute(object: entity): Promise<entity> {

      const uuidcomunicado = object.uuidcomunicado;

      const result = await repository.findOneBy({uuidcomunicado});

      if (!result) {
        throw notFound();
      }

      return await repository.save(object);

    };
    
};
