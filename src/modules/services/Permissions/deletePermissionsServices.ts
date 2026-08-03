import { notFound } from "../../../shared/errors/errorFactories";
import {repository} from '../../../shared/infra/typeorm/repositories/permissionsRepository';

interface IRequestDTO{
  uuidpermissao: string;
}

export default class deletePermissionsServices {

  public async execute(uuidpermissao: IRequestDTO) : Promise<void> {

    const result = await repository.findOneBy(uuidpermissao);

    if (!result) {
      throw notFound();
    }

    await repository.remove(result);

  }

};