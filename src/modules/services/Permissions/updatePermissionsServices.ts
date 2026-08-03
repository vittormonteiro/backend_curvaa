import { notFound } from "../../../shared/errors/errorFactories";
import {repository, entity} from '../../../shared/infra/typeorm/repositories/permissionsRepository';

export default class updatePermissionsServices {

  public async execute(object:entity): Promise<entity> {

    const uuidpermissao = object.uuidpermissao;

    const result = await repository.findOneBy({uuidpermissao});

    if (!result) {
      throw notFound();
    }

    return await repository.save(object);

  }

};

  