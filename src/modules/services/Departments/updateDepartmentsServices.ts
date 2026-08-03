import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/departmentsRepository';


export default class updateDepartmentsServices {

    public async execute(object: entity): Promise<entity> {

      const uuiddeparta = object.uuiddeparta;

      const result = await repository.findOneBy({uuiddeparta});

      if (!result) {
        throw notFound();
      }

     return await repository.save(object);
      
    };

};
