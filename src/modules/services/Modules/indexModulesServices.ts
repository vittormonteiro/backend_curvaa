import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/modulesRepository';

export default class indexModulesServices {

  public async execute(uuidmodulo: string): Promise<entity> {

    const result = await repository.findOneBy({uuidmodulo});

    if(!result){
      throw notFound();
    }

    return result;

  };

};