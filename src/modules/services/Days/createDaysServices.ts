import { conflict } from "../../../shared/errors/errorFactories";
import {repositoryView, repository, entity} from '../../../shared/infra/typeorm/repositories/daysRepository';

export default class createDaysServices {

    public async  execute(object: entity): Promise<entity> {

      if (await repositoryView.findByText(object.ano, object.codigo)) {
        throw conflict(`Já existe ${object.codigo}/${object.ano}.`);
      }

      const result =  repository.create(object);

      return await repository.save(result);

    };

};
