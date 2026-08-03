import { notFound, conflict } from "../../../shared/errors/errorFactories";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/worksRepository';

export default class updateProjectsServices {

  public async execute(object: entity): Promise<entity> {

    const result = await repository.findOneBy({"_uuid": object._uuid})

    if (!result) {
      throw notFound();
    }

    if (result.uuidlicenca !== object.uuidlicenca) {
      throw notFound('Obra nao encontrada para esta licenca.');
    }

    if (object.codigo !== result.codigo) {
      throw conflict('Código da obra não pode ser alterado.');
    }

    return await repository.save({
      ...result,
      ...object,
      uuidlicenca: result.uuidlicenca,
    });

  }

};
