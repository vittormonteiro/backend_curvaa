import {repository, entity} from '../../../shared/infra/typeorm/repositories/permissionsRepository';

export default class createPermissionsServicess {

  public async execute(object:entity): Promise<entity> {

    const result = repository.create(object);

    return await repository.save(result);

  };

};