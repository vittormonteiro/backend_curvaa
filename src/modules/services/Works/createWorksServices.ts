import { badRequest, conflict } from "../../../shared/errors/errorFactories";
import AppError from "../../../shared/errors/appError";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/worksRepository';

export default class createWorksServices {

  public async execute(object: entity): Promise<entity> {

    if (await repository.findByCode(object.codigo, object.uuidlicenca)) {
      throw conflict(`Já existe o código:${object.codigo}.`);
    }

    try {

      //const func = new functions();
      const content = repository.create(object);

      return await repository.save(content);

    } catch (error) {

      const message = error instanceof Error || error instanceof AppError ? error.message : String(error);
      throw badRequest(message);

    }

  }

};
