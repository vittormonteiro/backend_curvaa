import { notFound } from "../../../shared/errors/errorFactories";
import {repository, repositoryView, entity} from '../../../shared/infra/typeorm/repositories/departmentsRepository';

export default class createDepartmentsServices {

    public async execute(object: entity): Promise<entity> {

      if (await repositoryView.findByDepartments(object.departamento)) {
        throw notFound();
      }

      const result =  repository.create(object);
        
      return await repository.save(result);

    };
    
};
