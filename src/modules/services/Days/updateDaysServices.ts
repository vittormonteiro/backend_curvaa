import { notFound, conflict } from "../../../shared/errors/errorFactories";
import {repositoryView, repository, entity} from '../../../shared/infra/typeorm/repositories/daysRepository';

export default class updateDaysServices {

  public async execute(object:entity): Promise<entity> {

    const uuiddiasuteis = object.uuiddiasuteis;

    const result = await repository.findOneBy({uuiddiasuteis});

    if (!result) {
      throw notFound();
    }

    if (result.ano != object.ano || result.codigo != object.codigo) {
      if(await repositoryView.findByText(object.ano, object.codigo)){
        throw conflict(`Já existe ${object.codigo}/${object.ano}.`);
      }
    }

    return await repository.save(object);


  };
  
};
