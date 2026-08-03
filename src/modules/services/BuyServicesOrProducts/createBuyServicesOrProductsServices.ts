import {repository, entity} from '../../../shared/infra/typeorm/repositories/buyServicesProductsRepository';

export default class createBuyServicesOrProductsServices {

  public async execute(object: entity): Promise<entity> {

    const result =  repository.create(object);

    return await repository.save(result);

  };

};
